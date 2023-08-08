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
		TableBodyRow,
		Spinner,
		Button,
		Modal,
		Input,
		Helper
	} from 'flowbite-svelte';
	import type { iOffer, iRecipe } from '../services/types';
	import {
		addToBlocklist,
		findAllDiscountedIngredients,
		editRecipeModalOpen,
		Recipes,
		findDiscountedIngredientsOfRecipe
	} from '../services/stores';
	import EditRecipeModal from './editRecipeModal.svelte';

	export let recipe: iRecipe;

	let openBlockModal = false;
	let matchingOffers = findDiscountedIngredientsOfRecipe(recipe);
	let blockInputValue = '';

	let wrongOffer: { ingredient: string; offer: iOffer };

	async function handleClick() {
		addToBlocklist(wrongOffer.ingredient, blockInputValue);
		blockInputValue = '';
		// Force a page reload after the click event logic is executed
		location.reload();
	}
</script>

{#await matchingOffers}
	<div class="text-center recipeLoadingSpinner"><Spinner size="12" /></div>
{:then matchingOffers}
	<div class="recipeAccWrapper">
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
								{#key ingredient.isDiscounted}
									<span style="" class="float-right inline-block pr-2">
										<Indicator color={ingredient.isDiscounted ? 'green' : 'red'} />
									</span>
								{/key}
							</span>
							{#if ingredient.isDiscounted}
								<Table shadow class="ingredientTable">
									<TableHead>
										<TableHeadCell>Product</TableHeadCell>
										<TableHeadCell>Price</TableHeadCell>
										<TableHeadCell>Shop</TableHeadCell>
										<TableHeadCell>Date</TableHeadCell>
										<TableHeadCell>Remove</TableHeadCell>
									</TableHead>
									<TableBody>
										{#each matchingOffers.filter((mo) => mo.ingredient.name === ingredient.name) as { offer }}
											<TableBodyRow>
												<TableBodyCell>{offer.name}</TableBodyCell>
												<TableBodyCell>{offer.price}</TableBodyCell>
												<TableBodyCell>
													<Img class="h-5" src="/{offer.shop.toLowerCase()}.svg" />
												</TableBodyCell>
												<TableBodyCell>{offer.date}</TableBodyCell>
												<TableBodyCell
													><Button
														class="px-3 py-2"
														on:click={() => {
															openBlockModal = true;
															wrongOffer = { ingredient: ingredient.name, offer };
														}}
													>
														<svg
															class="w-5 h-5 text-gray-800 dark:text-white"
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
																d="M15.992 11.287c-1 .097-1.96.45-2.792 1.029a25.118 25.118 0 0 0-4.454 5.721 1.803 1.803 0 0 1-.655.705 1.742 1.742 0 0 1-1.648.096 1.786 1.786 0 0 1-.604-.457 1.874 1.874 0 0 1-.432-1.439l1.562-4.626m9.023-1.03H19V2.03c0-.273-.106-.535-.294-.728A.99.99 0 0 0 17.997 1h-1.002a.99.99 0 0 0-.71.301 1.042 1.042 0 0 0-.293.728v9.258Zm-8.02 1.03H3.003c-.322 0-.64-.08-.925-.233a2.022 2.022 0 0 1-.716-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.2C3.769 1.54 3.96 1 5.365 1c2.59 0 5.39 1.06 7.504 1.66"
															/>
														</svg></Button
													></TableBodyCell
												>
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
		<Button class="h-10 p-3 mt-20" on:click={() => editRecipeModalOpen.set(true)}>
			<svg
				class="w-5 h-5 text-gray-800 dark:text-white"
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
					d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
				/>
			</svg>
		</Button>
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}

<Modal size="lg" title="Remove Offer" bind:open={openBlockModal} autoclose>
	<div class="space-y-0">
		<p class="mb-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Please tell us which words in the offer caused to a missleading product offer.
		</p>
		<Table class="mb-8" shadow>
			<TableHead>
				<TableHeadCell>Product</TableHeadCell>
				<TableHeadCell>Price</TableHeadCell>
				<TableHeadCell>Shop</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>{wrongOffer.offer.name}</TableBodyCell>
					<TableBodyCell>{wrongOffer.offer.price}</TableBodyCell>
					<TableBodyCell>
						<Img class="h-5" src="/{wrongOffer.offer.shop.toLowerCase()}.svg" />
					</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
		<Input bind:value={blockInputValue} />
		<Helper class="text-sm mt-0"
			>For example: You have whipped cream as an ingredient and the special offer is cream cheese.
			Then please type in the word cheese. <br /> By doing this you will improve the offer selection.</Helper
		>
	</div>

	<svelte:fragment slot="footer">
		<Button on:click={handleClick}>Confirm</Button>
	</svelte:fragment>
</Modal>

<EditRecipeModal {recipe} />
