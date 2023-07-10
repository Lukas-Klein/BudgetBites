export interface iRecipe {
	id: number;
	title: string;
	ingredients: iIngredient[];
}

export interface iIngredient {
	name: string;
	amount: string;
	isDiscounted?: boolean;
}

export interface iOffer {
	name: string;
	price: string;
	date: string;
	shop: string;
}
