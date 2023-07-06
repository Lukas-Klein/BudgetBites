export interface iRecipe {
	title: string;
	ingredients: iIngredient[];
}

export interface iIngredient {
	name: string;
	amount: string;
}
