<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import '../app.css';
	import { Recipes, addRecipeModalOpen, findRecipeModalOpen, getRecipes } from '../services/stores';
	import NewRecipeModal from '../components/newRecipeModal.svelte';
	import RemoveRecipeModal from '../components/removeRecipeModal.svelte';
	import AllRecipesTable from '../components/allRecipesTable.svelte';
	import FindNewRecipeModal from '../components/findNewRecipeModal.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		Recipes.set(await getRecipes());
	});
</script>

<div class="RecipeButtonWrapper">
	<Button
		class="recipeButton"
		on:click={() => {
			findRecipeModalOpen.set(true);
		}}
	>
		<svg
			class="mr-2 -ml-1 w-5 h-5"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 20 20"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
			/>
		</svg>Find new Recipes
	</Button>
	<Button
		class="recipeButton"
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
<AllRecipesTable />
<RemoveRecipeModal />
<FindNewRecipeModal />
