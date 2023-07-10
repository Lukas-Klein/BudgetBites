<script lang="ts">
	import { Button, Label, Modal, Input } from 'flowbite-svelte';
	import { addRecipeModalOpen, getRecipes, saveRecipe, user } from '../services/stores';
	import type { iIngredient } from '../services/types';

	let recipeName = '';
	let ingredientCount = 1;
	let ingredients: iIngredient[] = [{ name: '', amount: '' }];

	function addIngredient(event: any) {
		const index = event.target.dataset.index;
		const property = event.target.dataset.property;
		const value = event.target.value;

		// Ensure that the ingredient object exists
		if (!ingredients[index]) {
			ingredients[index] = { name: '', amount: '' };
		}
		// Update the corresponding property of the ingredient
		(ingredients[index] as any)[property] = value;
	}

	function increaseIngredientCount() {
		ingredientCount++;
		ingredients.push({ name: '', amount: '' });
	}

	function decreaseIngredientCount() {
		if (ingredientCount > 1) {
			ingredientCount--;
			ingredients.pop();
		}
	}

	function resetValues() {
		recipeName = '';
		ingredientCount = 1;
		ingredients = [{ name: '', amount: '' }];
	}
</script>

<Modal title="New Recipe: {recipeName}" bind:open={$addRecipeModalOpen} outsideclose>
	<Label class="space-y-2 mb-4">
		<span>Recipe Name</span>
		<Input bind:value={recipeName} />
	</Label>
	{#each Array(ingredientCount) as _, i}
		<div class="addIngredientWrapper">
			<Label class="space-y-2 mb-4">
				<span>Ingredient</span>
				<Input
					on:change={addIngredient}
					data-index={i}
					data-property="name"
					bind:value={ingredients[i].name}
				/>
			</Label>
			<Label class="space-y-2 mb-4">
				<span>Amount</span>
				<Input
					on:change={addIngredient}
					data-property="amount"
					data-index={i}
					bind:value={ingredients[i].amount}
				/>
			</Label>
		</div>
	{/each}
	<div class="addRecipeWrapper">
		<Button on:click={decreaseIngredientCount}>
			<svg
				class="mr-2 -ml-1 w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentcolor"
				viewBox="0 0 20 2"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 1h16"
				/>
			</svg>Remove Ingredient
		</Button>
		<Button on:click={increaseIngredientCount}>
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
			</svg>Add Ingredient
		</Button>
	</div>
	<svelte:fragment slot="footer">
		<Button
			on:click={() => {
				saveRecipe(recipeName, ingredients, $user.id), resetValues();
			}}>Save</Button
		>
		<Button color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>
