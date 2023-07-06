<script lang="ts">
	import { Accordion } from 'flowbite-svelte';
	import Navbar from '../components/navbar.svelte';
	import Recipes from '../recipes.json';
	import RecipeAccordion from '../components/recipeAccordion.svelte';
	import '../app.css';
</script>

<Navbar />
<div class="recipeWrapper">
	<Accordion>
		{#each Recipes as recipe}
			<RecipeAccordion {recipe} />
		{/each}
	</Accordion>
</div>
