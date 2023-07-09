<script lang="ts">
	import { Indicator, AccordionItem, Span, Accordion, Img } from 'flowbite-svelte';
	import type { iIngredient, iOffer, iRecipe } from '../services/types';
	import Offers from '../../../Scraping/offers.json';

	export let recipe: iRecipe;

	let matchingOffers: { offer: iOffer; ingredient: iIngredient }[] = [];

	function findDiscountedIngredients(
		recipe: iRecipe
	): { offer: iOffer; ingredient: iIngredient }[] {
		const discountedIngredients: { offer: iOffer; ingredient: iIngredient }[] = [];

		recipe.ingredients.forEach((ingredient: iIngredient) => {
			const matchingOffers = Offers.filter((offer: iOffer) =>
				offer.name.toLowerCase().includes(ingredient.name.toLowerCase())
			);
			if (matchingOffers.length > 0) {
				ingredient.isDiscounted = true;
				matchingOffers.forEach((offer: iOffer) => {
					discountedIngredients.push({ offer, ingredient });
				});
			} else {
				ingredient.isDiscounted = false;
			}
		});
		return discountedIngredients;
	}

	matchingOffers = findDiscountedIngredients(recipe);
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
		<Accordion flush>
			<AccordionItem>
				<span class="flex items-center gap-x-2" slot="header">
					{ingredient.name}
					<Span align="right">{ingredient.amount}</Span>
					<span style="" class="float-right inline-block pr-2">
						<Indicator color={ingredient.isDiscounted ? 'green' : 'red'} />
					</span>
				</span>
				{#if ingredient.isDiscounted}
					{#each matchingOffers.filter((mo) => mo.ingredient.name === ingredient.name) as { offer, ingredient: iIngredient }}
						<p class="mb-2 text-gray-500 dark:text-gray-400 dropdownOfferWrapper">
							{offer.name}
							<Span align="right">{offer.price}</Span>
							<Img class="shopImage" src="{offer.shop.toLowerCase()}.svg" />
							<Span align="right">{offer.date}</Span>
						</p>
					{/each}
				{/if}
			</AccordionItem>
		</Accordion>
	{/each}
</AccordionItem>
