<script lang="ts">
	import type { Snippet } from 'svelte';
	import { enhance } from '$app/forms';
	
	import '$lib/client/styles/index.css';
	import { ThemePicker } from '$lib/client/comp';

	import type { PageData } from './$types';

	const {
		children,
		data
	}: {
		children: Snippet;
		data: PageData;
	} = $props();
</script>

<header>
	<strong>🌱 <a href="/">Seedling Life</a></strong>
	<div>
		<!-- theme picker -->
		<ThemePicker/>
		<!-- account mgmt -->
		{#if data?.user}
			<p>[{data.user.username}]</p>
			<form method="post" use:enhance action="/logout">
				<strong>
					<button class="a">Logout</button>
				</strong>
			</form>
		{:else}
			<a class="button" href="/login">Login</a>
		{/if}
	</div>
</header>
<main class="container">
	{@render children()}
</main>
<footer>Copyright Yadda Yadda</footer>

<style>
	header,
	main,
	footer {
		padding: 0.5rem;
	}

	header,
	header > div {
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}

	strong {
		font-size: larger;
	}

	main {
		min-height: 80vh;
	}

	footer {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}
</style>
