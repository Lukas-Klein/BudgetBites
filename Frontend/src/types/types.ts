export interface iRecipe {
	title: string;
	ingredients: iIngredient[];
}

export interface iIngredient {
	name: string;
	amount: string;
}

export interface iOffer {
	name: string;
	price: string;
	date: string;
	shop: string;
}
