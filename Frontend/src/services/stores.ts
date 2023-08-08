import { writable } from 'svelte/store';
import { supabase } from '../supabase';
import type { iIngredient, iOffer, iRecipe } from './types';
import type { User } from '@supabase/supabase-js';
import Offers from '../../../Scraping/offers.json';
// import Offers from '../../../Scraping/testoffers.json';

export const addRecipeModalOpen = writable<boolean>(false);

export const editRecipeModalOpen = writable<boolean>(false);

export const removeRecipeModalOpen = writable<{ open: boolean; id: number }>({
	open: false,
	id: 0
});

export const Recipes = writable<iRecipe[]>([]);

export const user = writable<User>();

export const discountedIngredients = writable<{ offer: iOffer; ingredient: iIngredient }[]>([]);

export async function getRecipes(): Promise<iRecipe[]> {
	let { data: recipes, error } = await supabase.from('recipes').select('id, title, ingredients');

	if (error) {
		console.log(error);
	} else if (recipes) {
		return recipes;
	}
	return [];
}

export async function getRecipeByID(id: string): Promise<iRecipe[]> {
	let { data: recipes, error } = await supabase
		.from('recipes')
		.select('id, title, ingredients')
		.eq('id', Number(id));

	if (error) {
		console.log(error);
	} else if (recipes) {
		return recipes;
	}
	return [];
}

export async function saveRecipe(title: string, ingredients: iIngredient[], user_id: string) {
	const { data, error } = await supabase
		.from('recipes')
		.insert([{ title: title, ingredients: ingredients, user_id }])
		.select();

	error ? console.error(error) : null;
	addRecipeModalOpen.set(false);

	Recipes.update((recipes) => {
		return [...recipes, { id: 99, title: title, ingredients: ingredients }];
	});
}

export async function deleteRecipe(id: number) {
	const { data, error } = await supabase.from('recipes').delete().match({ id: id });

	error ? console.error(error) : null;

	Recipes.update((recipes) => {
		return recipes.filter((recipe) => recipe.id !== id);
	});

	removeRecipeModalOpen.set({ open: false, id: 0 });
}

export async function editRecipe(recipe: iRecipe, user_id: string) {
	const { data, error } = await supabase
		.from('recipes')
		.update({ title: recipe.title, ingredients: recipe.ingredients })
		.eq('id', recipe.id)
		.eq('user_id', user_id);

	error ? console.error(error) : null;

	editRecipeModalOpen.set(false);

	// Force a page reload after the click event logic is executed
	location.reload();
}

export async function findAllDiscountedIngredients(
	allRecipes: iRecipe[]
): Promise<{ offer: iOffer; ingredient: iIngredient }[]> {
	const discountedIngredients: { offer: iOffer; ingredient: iIngredient }[] = [];

	const blockList = await getBlockList();

	allRecipes.forEach((recipe: iRecipe) => {
		recipe.ingredients.forEach((ingredient: iIngredient) => {
			const matchingOffers = Offers.filter((offer: iOffer) => {
				const regex = new RegExp(`\\b${ingredient.name}\\b`, 'i');
				let blockedWords: string[] = [];
				blockList.forEach((ingredientsBlocked) => {
					if (ingredientsBlocked.ingredient === ingredient.name) {
						blockedWords = ingredientsBlocked.blockedWords;
					}
				});
				let blockedWordsInOffer: boolean = false;
				if (blockedWords.length > 0) {
					blockedWords.forEach((word) => {
						if (offer.name.includes(word)) {
							blockedWordsInOffer = true;
						}
					});
				}

				return regex.test(offer.name) && !blockedWordsInOffer;
			});

			if (matchingOffers.length > 0) {
				ingredient.isDiscounted = true;
				matchingOffers.forEach((offer: iOffer) => {
					discountedIngredients.push({ offer, ingredient });
				});
			} else {
				ingredient.isDiscounted = false;
			}
		});
	});
	return discountedIngredients;
}

export function findDiscountedIngredientsOfRecipe(
	recipe: iRecipe
): Promise<{ offer: iOffer; ingredient: iIngredient }[]> {
	return findAllDiscountedIngredients([recipe]);
}

export async function getBlockList() {
	const { data, error } = await supabase.from('blockedWords').select('ingredient, blockedWords');

	if (error) {
		console.log(error);
	} else if (data) {
		return data;
	}
	return [];
}

export async function getBlockListByIngredient(ingredient: string) {
	const { data, error } = await supabase
		.from('blockedWords')
		.select('ingredient, blockedWords')
		.eq('ingredient', ingredient);

	if (error) {
		console.log(error);
	} else if (data) {
		return data;
	}
	return [];
}

export async function setBlockedWords(ingredient: string, blockedWords: string[]) {
	const { data, error } = await supabase
		.from('blockedWords')
		.insert([{ ingredient: ingredient, blockedWords: blockedWords }])
		.select();

	error ? console.error(error) : null;
}

export async function addToBlocklist(ingredient: string, blockedWord: string) {
	let wordsForBlocklist: string[] = [blockedWord];

	const alreadyBlocked = await getBlockListByIngredient(ingredient);

	if (alreadyBlocked.length !== 0) {
		wordsForBlocklist = [...alreadyBlocked[0].blockedWords, blockedWord];

		const { error } = await supabase
			.from('blockedWords')
			.update({ blockedWords: wordsForBlocklist })
			.eq('ingredient', ingredient);

		error ? console.error(error) : null;
	} else {
		const { error } = await supabase
			.from('blockedWords')
			.insert([{ ingredient: ingredient, blockedWords: wordsForBlocklist }])
			.select();

		error ? console.error(error) : null;
	}
}
