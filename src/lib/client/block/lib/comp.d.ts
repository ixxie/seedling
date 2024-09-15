import type { Component, Bindable } from 'svelte';

import type { BlockData } from './data';

export declare const MyComponent: Component<{
  block: Bindable<BlockData>;                  // prop
}>;