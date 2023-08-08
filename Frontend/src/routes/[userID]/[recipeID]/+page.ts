import { get } from 'svelte/store';
import { findDiscountedIngredientsOfRecipe, getRecipes } from '../../../services/stores';

export const load = ({ params }) => {
	const fetchRecipe = async (id: string) => {
		const allRecipes = await getRecipes();
		const recipe = allRecipes.find((recipe) => recipe.id === Number(id));
		if (!recipe) {
			return null;
		}
		findDiscountedIngredientsOfRecipe(recipe);
		return recipe;
	};

	return {
		recipe: fetchRecipe(params.recipeID)
	};
};
