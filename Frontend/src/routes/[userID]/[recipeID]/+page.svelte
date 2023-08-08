<script lang="ts">
	import '../../../app.css';
	import BreadCrumb from '../../../components/breadCrumb.svelte';
	import RecipeAccordion from '../../../components/recipeAccordion.svelte';

	export let data;
	const fetchedRecipe = data;
</script>

<svelte:head>
	{#if fetchedRecipe.recipe}
		<title>{fetchedRecipe.recipe.title}</title>
	{:else}
		<title>404</title>
	{/if}
</svelte:head>

{#if fetchedRecipe.recipe}
	<BreadCrumb recipe={fetchedRecipe.recipe} />
	<RecipeAccordion recipe={fetchedRecipe.recipe} />
{:else}
	<h1>404</h1>
	<p>Recipe not found</p>
{/if}
