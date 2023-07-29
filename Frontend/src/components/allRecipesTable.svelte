<script lang="ts">
	import {
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		A,
		Spinner
	} from 'flowbite-svelte';
	import {
		Recipes,
		user,
		removeRecipeModalOpen,
		findDiscountedIngredients
	} from '../services/stores';
	import type { iRecipe } from '../services/types';
	async function calculateDiscountedIngredients(recipe: iRecipe) {
		await findDiscountedIngredients(recipe);
		let count = 0;
		recipe.ingredients.forEach((ingredient) => {
			if (ingredient.isDiscounted) count++;
		});
		return count;
	}
</script>

<div class="recipeWrapper">
	{#key $Recipes}
		<Table hoverable={true}>
			<TableHead class="bg-slate-100">
				<TableHeadCell>Recipe Name</TableHeadCell>
				<TableHeadCell>Ingredient Count</TableHeadCell>
				<TableHeadCell>Discounted Ingredients</TableHeadCell>
				<TableHeadCell>Delete</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $Recipes as recipe}
					<TableBodyRow>
						<TableBodyCell><A href="/{$user.id}/{recipe.id}">{recipe.title}</A></TableBodyCell>
						<TableBodyCell>{recipe.ingredients.length}</TableBodyCell>
						{#await calculateDiscountedIngredients(recipe)}
							<TableBodyCell>
								<Spinner size="5" />
							</TableBodyCell>
						{:then count}
							<TableBodyCell>{count}</TableBodyCell>
						{:catch error}
							<TableBodyCell>Error: {error.message}</TableBodyCell>
						{/await}
						<TableBodyCell>
							<svg
								on:click={() => {
									removeRecipeModalOpen.set({ open: true, id: recipe.id });
								}}
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
