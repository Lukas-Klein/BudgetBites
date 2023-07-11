<script lang="ts">
	import {
		Indicator,
		AccordionItem,
		Span,
		Accordion,
		Img,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';
	import type { iIngredient, iOffer, iRecipe } from '../services/types';
	import { findDiscountedIngredients } from '../services/stores';

	export let recipe: iRecipe;

	let matchingOffers: { offer: iOffer; ingredient: iIngredient }[] = [];

	matchingOffers = findDiscountedIngredients(recipe);
</script>

<Accordion>
	<AccordionItem open class="mt-20">
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
						<Table shadow class="ingredientTable">
							<TableHead>
								<TableHeadCell>Product</TableHeadCell>
								<TableHeadCell>Price</TableHeadCell>
								<TableHeadCell>Shop</TableHeadCell>
								<TableHeadCell>Date</TableHeadCell>
							</TableHead>
							<TableBody>
								{#each matchingOffers.filter((mo) => mo.ingredient.name === ingredient.name) as { offer, ingredient: iIngredient }}
									<TableBodyRow>
										<TableBodyCell>{offer.name}</TableBodyCell>
										<TableBodyCell>{offer.price}</TableBodyCell>
										<TableBodyCell>
											<Img class="h-5" src="/{offer.shop.toLowerCase()}.svg" />
										</TableBodyCell>
										<TableBodyCell>{offer.date}</TableBodyCell>
									</TableBodyRow>
								{/each}
							</TableBody>
						</Table>
					{/if}
				</AccordionItem>
			</Accordion>
		{/each}
	</AccordionItem>
</Accordion>
