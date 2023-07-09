import { writable } from 'svelte/store';
import { supabase } from '../supabase';
import type { iIngredient, iRecipe } from './types';

export const addRecipeModalOpen = writable<boolean>(false);

export const Recipes = writable<iRecipe[]>([]);

export const user = writable();

export async function getRecipes(): Promise<iRecipe[]> {
	let { data: recipes, error } = await supabase.from('recipes').select('title, ingredients');

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
		return [...recipes, { title: title, ingredients: ingredients }];
	});
}
