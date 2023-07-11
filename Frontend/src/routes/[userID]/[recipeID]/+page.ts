import { getRecipeByID } from '../../../services/stores';

export const load = ({ params }) => {
	const fetchRecipe = async (id: string) => {
		return getRecipeByID(id);
	};

	return {
		recipe: fetchRecipe(params.recipeID)
	};
};
