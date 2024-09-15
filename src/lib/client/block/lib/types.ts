import type { Component } from "svelte";

export type BlockType = 'p'

export interface Block {
    type: BlockType
    content: string
}

export type BlockMapping = {
    [index in BlockType]: Component;
};