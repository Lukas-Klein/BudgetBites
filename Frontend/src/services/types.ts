export interface iRecipe {
	id: number;
	title: string;
	ingredients: iIngredient[];
	amountOfDiscountedIngredients?: number;
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

interface Measure {
	amount: number;
	unitShort: string;
	unitLong: string;
}

interface Ingredient {
	id: number;
	aisle: string;
	image: string;
	consistency: string;
	name: string;
	nameClean: string;
	original: string;
	originalName: string;
	amount: number;
	unit: string;
	meta: string[];
	measures: {
		us: Measure;
		metric: Measure;
	};
}

interface AnalyzedInstructionStep {
	number: number;
	step: string;
	ingredients: Ingredient[];
	equipment: any[];
	length?: {
		number: number;
		unit: string;
	};
}

interface AnalyzedInstruction {
	name: string;
	steps: AnalyzedInstructionStep[];
}

interface Recipe {
	vegetarian: boolean;
	vegan: boolean;
	glutenFree: boolean;
	dairyFree: boolean;
	veryHealthy: boolean;
	cheap: boolean;
	veryPopular: boolean;
	sustainable: boolean;
	lowFodmap: boolean;
	weightWatcherSmartPoints: number;
	gaps: string;
	preparationMinutes: number;
	cookingMinutes: number;
	aggregateLikes: number;
	healthScore: number;
	creditsText: string;
	license: string;
	sourceName: string;
	pricePerServing: number;
	extendedIngredients: Ingredient[];
	id: number;
	title: string;
	readyInMinutes: number;
	servings: number;
	sourceUrl: string;
	image: string;
	imageType: string;
	summary: string;
	cuisines: string[];
	dishTypes: string[];
	diets: string[];
	occasions: string[];
	instructions: string;
	analyzedInstructions: AnalyzedInstruction[];
	originalId: number | null;
	spoonacularSourceUrl: string;
}

export interface RecipeResponse {
	recipes: Recipe[];
}
