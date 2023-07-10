<script lang="ts">
	import { Label, Input, CloseButton, Button, Img } from 'flowbite-svelte';
	import { supabase } from '../supabase';
	import type { Provider } from '@supabase/supabase-js';

	let loading = false;
	let email = '';

	async function loginOtp() {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({
				email: email
			});
			if (error) throw error;
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	}

	async function loginOAuth(provider: Provider) {
		try {
			loading = true;
			supabase.auth.signInWithOAuth({
				provider: provider
			});
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	}
</script>

<div class="my-2" style="width: 30vw;">
	<form on:submit|preventDefault={loginOtp}>
		<Label class="space-y-2">
			<span>E-Mail Address</span>
			<Input bind:value={email} type="email" placeholder="yourName@rightHere.com" size="md">
				<svg
					slot="left"
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path
						d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
					/></svg
				>
			</Input>
		</Label>
		<Button class="my-3" type="submit">Log In</Button>
	</form>
	<div class="flex flex-col">
		<Button outline class="my-2" type="submit" on:click={() => loginOAuth('google')}
			><Img class="h-5 pr-1" src="./google.svg" /> Log In with Google</Button
		>
		<Button outline class="my-2" type="submit" on:click={() => loginOAuth('github')}
			><Img class="h-5 pr-1" src="./github.svg" />Log In with Github</Button
		>
		<Button outline class="my-2" type="submit" on:click={() => loginOAuth('discord')}
			><Img class="h-5 pr-1" src="./discord.svg" />Log In with Discord</Button
		>
	</div>
</div>
