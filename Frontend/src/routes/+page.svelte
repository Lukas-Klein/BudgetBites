<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import '../app.css';
	import {
		Recipes,
		addRecipeModalOpen,
		findDiscountedIngredients,
		getRecipes
	} from '../services/stores';
	import NewRecipeModal from '../components/newRecipeModal.svelte';
	import { onMount } from 'svelte';
	import RemoveRecipeModal from '../components/removeRecipeModal.svelte';
	import AllRecipesTable from '../components/allRecipesTable.svelte';

	onMount(async () => {
		Recipes.set(await getRecipes());
		$Recipes.forEach(async (element) => {
			await findDiscountedIngredients(element);
		});
	});

	$: $Recipes.forEach(async (element) => {
		await findDiscountedIngredients(element);
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
<AllRecipesTable />
<RemoveRecipeModal />
