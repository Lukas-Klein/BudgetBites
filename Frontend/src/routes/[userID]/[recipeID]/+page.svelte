<script lang="ts">
	import '../../../app.css';
	import BreadCrumb from '../../../components/breadCrumb.svelte';
	import RecipeAccordion from '../../../components/recipeAccordion.svelte';

	export let data;
	const { recipe } = data;

	const fetchedRecipe = data.recipe[0];
</script>

<BreadCrumb recipe={fetchedRecipe} />
<RecipeAccordion recipe={fetchedRecipe} />
