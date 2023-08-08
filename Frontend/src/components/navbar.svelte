<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Span,
		DarkMode
	} from 'flowbite-svelte';
	import { supabase } from '../supabase';

	function logout() {
		supabase.auth.signOut();
	}
</script>

<Navbar class="bg-slate-300" let:hidden let:toggle>
	<NavBrand href="/">
		<img src="/BudgetBites.svg" class="mr-3 h-20 sm:h-15" alt="Flowbite Logo" />
		<Span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			BudgetBites
		</Span>
	</NavBrand>
	<div class="flex md:order-2">
		<Button
			color="none"
			data-collapse-toggle="mobile-menu-3"
			aria-controls="mobile-menu-3"
			aria-expanded="false"
			class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 dark:text-white"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/></svg
			>
		</Button>

		<DarkMode class="text-lg mx-2">
			<svelte:fragment slot="lightIcon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 32 32"
					><path
						fill="currentColor"
						d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
					/></svg
				>
			</svelte:fragment>
			<svelte:fragment slot="darkIcon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 32 32"
					><path
						fill="currentColor"
						d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"
					/></svg
				>
			</svelte:fragment>
		</DarkMode>
		<Button on:click={logout} class="mx-2 px-3 logoutButton" title="Logout">
			<svg
				class="w-5 h-5 text-white logoutIcon"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 18 15"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"
				/>
			</svg>
			<div class="logoutText">Logout</div>
		</Button>
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden}>
		<NavLi class="text-black dark:text-white" href="/">Home</NavLi>
	</NavUl>
</Navbar>
