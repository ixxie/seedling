import type { BlockData, BlockId } from "../lib/data"



class BlockEditorState {
    blocks = $state([])
    backend: BlockBackend[]

    constructor(state = [], backend: BlockBackend) {
        this.blocks = state
        this.load()
    }

    // lifecycle

    save () {
        
    }

    load () {

    }

    // operations

    create (block?: BlockData) {

    }

    read ({blockId, index}: {blockId?: BlockId, index?: number}) {

    }

    update (block?: BlockData) {

    }

    delete ({blockId}: {blockId: BlockId}) {

    }
}