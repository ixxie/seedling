<script lang="ts">
	import { setContext } from 'svelte';

	import type { Block, BlockMapping } from './lib/types';

	import { P } from './lib/block';

	const blocks = $state<Block[]>([]);

	const map: BlockMapping = {
		p: P
	};

	const add = () => {
		blocks.push({ type: 'p', content: '' });
	};
</script>

<article>
	<div>
		{#each blocks as block, i}
			<svelte:component this={map[block.type]} bind:block={blocks[i]} />
		{/each}
		<button onclick={add}>+</button>
	</div>
	<pre>{JSON.stringify(blocks, null, 2)}</pre>
</article>

<style>
	article {
		display: flex;
		flex-flow: row;
		gap: 1rem;
		width: 95vw;
	}

	div {
		display: flex;
		flex-flow: column;
		gap: 1rem;
		flex-grow: 2;
	}

	pre {
		flex-grow: 1;
		overflow-x: auto;
		max-width: 30vw;
	}
</style>
