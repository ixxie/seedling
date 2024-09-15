<script lang="ts">
	import { setContext } from 'svelte';

	import type { Block, BlockMapping } from '../lib/types';

	import { P } from '../types';

	const blocks = $state<Block[]>([]);

	const map: BlockMapping = {
		p: P
	};

	const add = () => {
		blocks.push({ type: 'p', content: '' });
	};

	$inspect(blocks);
</script>

<div class="editor">
	<div class="blocks">
		{#each blocks as block, i}
			<svelte:component this={map[block.type]} bind:block={blocks[i]} />
		{/each}
		<button onclick={add}>+</button>
	</div>
</div>

<style>
	.editor {
		display: flex;
		flex-flow: row;
		gap: 1rem;
		width: 95vw;
	}

	.blocks {
		display: flex;
		flex-flow: column;
		gap: 1rem;
		flex-grow: 2;
	}
</style>
