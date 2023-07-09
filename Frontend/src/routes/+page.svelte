<script lang="ts">
	import { Accordion, Button } from 'flowbite-svelte';
	import RecipeAccordion from '../components/recipeAccordion.svelte';
	import '../app.css';
	import { Recipes, addRecipeModalOpen, getRecipes } from '../services/stores';
	import NewRecipeModal from '../components/newRecipeModal.svelte';
	import { onMount } from 'svelte';
	import type { iRecipe } from '../services/types';

	onMount(async () => {
		Recipes.set(await getRecipes());
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
		<Accordion>
			{#each $Recipes as recipe}
				<RecipeAccordion {recipe} />
			{/each}
		</Accordion>
	{/key}
</div>
