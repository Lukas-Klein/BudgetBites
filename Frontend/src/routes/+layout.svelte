<script>
	import { onMount } from 'svelte';
	import '../app.postcss';
	import Auth from '../components/Auth.svelte';
	import Navbar from '../components/navbar.svelte';
	import { getRecipes, user } from '../services/stores';
	import { supabase } from '../supabase';

	onMount(async () => {
		console.log(await supabase.auth.getUser());
		user.set(supabase.auth.getUser());

		supabase.auth.onAuthStateChange((_, session) => {
			user.set(session?.user);
			if (session?.user) getRecipes();
		});
	});
</script>

{#if $user}
	<Navbar />
	<div id="app">
		<slot />
	</div>
{:else}
	<div id="app" class="authWrapper">
		<Auth />
	</div>
{/if}
