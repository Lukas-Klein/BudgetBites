<script lang="ts">
	import { Accordion, AccordionItem, Span } from 'flowbite-svelte';
	import type { iRecipe } from '../types/types';

	export let recipe: iRecipe;
</script>

<AccordionItem>
	<span slot="header">{recipe.title}</span>
	<div slot="arrowup">
		<svg
			class="w-6 h-6 shrink-0 rotate-180"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
			/></svg
		>
	</div>
	<span slot="arrowdown">
		<svg
			class="w-6 h-6 shrink-0"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
			/></svg
		>
	</span>
	{#each recipe.ingredients as ingredient}
		<p class="mb-2 text-gray-500 dark:text-gray-400">
			{ingredient.name}
			<Span align="right">{ingredient.amount}</Span>
		</p>
	{/each}
</AccordionItem>
