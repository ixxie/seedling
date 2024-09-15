<script lang="ts">
	import type { Block } from '../../lib/types';

	const {
		block = $bindable()
	}: {
		block: Block;
	} = $props();
</script>

<p bind:innerText={block.content} contenteditable></p>

<style>
	p {
		background-color: rgb(231, 231, 231);
		min-height: 1rem;
		padding: 0.5rem;
		margin: 0;
	}
</style>
