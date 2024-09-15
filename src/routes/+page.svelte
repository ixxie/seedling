<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article class="card">
	<h1>Welcome to Seedling Life, {data.user?.username}!</h1>

	<p>Some text comes here surely!</p>
</article>