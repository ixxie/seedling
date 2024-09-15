<script lang="ts">
	import type { Component } from "svelte";

    import type {BlockData} from './data'

    const {
        block = $bindable(),
        component,
        ...rest
    }: {
        block: BlockData,
        component: Component,
        [key: string]: unknown
    } = $props()
</script>

<svelte:component this={component} {...rest}/>