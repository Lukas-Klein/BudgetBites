<script lang="ts">
	import {
		A,
		Accordion,
		Button,
		Checkbox,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import '../app.css';
	import {
		Recipes,
		addRecipeModalOpen,
		deleteRecipe,
		findDiscountedIngredients,
		getRecipes
	} from '../services/stores';
	import NewRecipeModal from '../components/newRecipeModal.svelte';
	import { onMount } from 'svelte';
	import RecipeAccordion from '../components/recipeAccordion.svelte';
	import type { iRecipe } from '../services/types';

	const amountOfDiscountedIngredients = (recipe: iRecipe) => {
		let count = 0;
		recipe.ingredients.forEach((ingredient) => {
			if (ingredient.isDiscounted) count++;
		});
		return count;
	};

	onMount(async () => {
		Recipes.set(await getRecipes());
		$Recipes.forEach((element) => {
			findDiscountedIngredients(element);
		});
	});
</script>

<div class="addRecipeWrapper">
	<Button
		class="addRecipeButton"
		on:click={() => {
			addRecipeModalOpen.set(true);
		}}
	>
		<svg
			class="mr-2 -ml-1 w-5 h-5"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentcolor"
			viewBox="0 0 20 20"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 1v16M1 9h16"
			/>
		</svg> Add new Recipe
	</Button>
	<NewRecipeModal />
</div>
<div class="recipeWrapper">
	{#key $Recipes}
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>Recipe Name</TableHeadCell>
				<TableHeadCell>Ingredient Count</TableHeadCell>
				<TableHeadCell>Discounted Ingredients</TableHeadCell>
				<TableHeadCell>Delete</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $Recipes as recipe, i}
					<TableBodyRow>
						<TableBodyCell><a href="/{recipe.id}">{recipe.title}</a></TableBodyCell>
						<TableBodyCell>{recipe.ingredients.length}</TableBodyCell>
						<TableBodyCell>{amountOfDiscountedIngredients(recipe)}</TableBodyCell>
						<TableBodyCell>
							<svg
								on:click={() => deleteRecipe(recipe.id)}
								class="w-4 h-4 text-gray-800 dark:text-white cursor-pointer hover:text-red-500 dark:hover:text-red-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 18 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
								/>
							</svg>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{/key}
</div>
