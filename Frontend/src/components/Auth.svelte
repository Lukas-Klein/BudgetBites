<script lang="ts">
	import { Label, Input, CloseButton, Button } from 'flowbite-svelte';
	import { supabase } from '../supabase';

	let loading = false;
	let email = '';

	const handleLogin = async () => {
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
	};
</script>

<div class="my-2">
	<form on:submit|preventDefault={handleLogin}>
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
		<Button class="my-2" type="submit">Log In</Button>
	</form>
</div>
