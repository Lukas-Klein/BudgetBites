import { writable } from 'svelte/store';
import { supabase } from '../supabase';
import type { iIngredient, iOffer, iRecipe } from './types';
import type { User } from '@supabase/supabase-js';
import Offers from '../../../Scraping/offers.json';

export const addRecipeModalOpen = writable<boolean>(false);

export const Recipes = writable<iRecipe[]>([]);

export const user = writable<User>();

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
}

export function findDiscountedIngredients(
	recipe: iRecipe
): { offer: iOffer; ingredient: iIngredient }[] {
	const discountedIngredients: { offer: iOffer; ingredient: iIngredient }[] = [];

	recipe.ingredients.forEach((ingredient: iIngredient) => {
		const matchingOffers = Offers.filter((offer: iOffer) => {
			const regex = new RegExp(`\\b${ingredient.name}\\b`, 'i');
			return regex.test(offer.name);
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
	return discountedIngredients;
}
