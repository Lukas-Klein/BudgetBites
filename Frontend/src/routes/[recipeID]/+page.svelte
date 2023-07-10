<script lang="ts">
	import '../../app.css';
	import RecipeAccordion from '../../components/recipeAccordion.svelte';

	export let data;
	const { recipe } = data;

	const fetchedRecipe = data.recipe[0];
</script>

<RecipeAccordion recipe={fetchedRecipe} />
