<script lang="ts">
	import { Button, Label, Modal, Input } from 'flowbite-svelte';
	import { editRecipe, editRecipeModalOpen, user } from '../services/stores';
	import type { iIngredient, iRecipe } from '../services/types';
	export let recipe: iRecipe;

	let ingredientCount = recipe.ingredients.length;
	let ingredients: iIngredient[] = recipe.ingredients;

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
</script>

<Modal title="New Recipe: {recipe.title}" bind:open={$editRecipeModalOpen} outsideclose>
	<Label class="space-y-2 mb-4">
		<span>Recipe Name</span>
		<Input bind:value={recipe.title} />
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
				editRecipe(recipe, $user.id);
			}}>Save</Button
		>
		<Button color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>
