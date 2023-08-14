<script lang="ts">
	import { Button, Label, Modal, Input, Card } from 'flowbite-svelte';
	import { findRecipeModalOpen } from '../services/stores';
	import type { RecipeResponse } from '../services/types';

	let findNewRecipes = getNewRecipes();

	async function getNewRecipes() {
		const res = await fetch(
			'https://api.spoonacular.com/recipes/random?apiKey=8252a244cb6c4e458c58f9a37ee5751a&number=20'
		);
		const data = await res.json();
		return handleFetch(data);
	}

	function handleFetch(data: RecipeResponse) {
		interface ExtendedIngredient {
			name: string;
			amount: number;
			unit: string;
		}

		interface Recipe {
			title: string;
			extendedIngredients: ExtendedIngredient[];
		}

		interface ExtractedData {
			title: string;
			ingredients: ExtendedIngredient[];
		}

		interface RecipeData {
			recipes: Recipe[];
		}

		function extractIngredients(recipeData: RecipeData): ExtractedData[] {
			const extractedData: ExtractedData[] = [];

			for (const recipe of recipeData.recipes) {
				const ingredients: ExtractedData['ingredients'] = recipe.extendedIngredients.map(
					(ingredient) => ({
						name: ingredient.name,
						amount: ingredient.amount,
						unit: ingredient.unit
					})
				);

				extractedData.push({
					title: recipe.title,
					ingredients: ingredients
				});
			}

			return extractedData;
		}

		return extractIngredients(data);
	}
</script>

<Modal title="Explore these new Recipes:" bind:open={$findRecipeModalOpen} size="lg" outsideclose>
	<div class="exploreRecipes">
		{#await findNewRecipes then newRecipes}
			{#each newRecipes as recipe}
				<Card href="/cards">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{recipe.title}
					</h5>
					<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
						{#each recipe.ingredients as ingredient}
							{ingredient.name} {ingredient.amount} {ingredient.unit}
						{/each}
					</p>
				</Card>
			{/each}
		{:catch error}
			<p>Something went wrong: {error.message}</p>
		{/await}
	</div>
</Modal>
