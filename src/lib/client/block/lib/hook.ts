import { setContext, getContext } from "svelte";

import { BlockEditor } from '../editor/state'

const context = 'editor'

const useEditor = () => {
    const parent = getContext(context)

    if (!parent) {
        setContext(context, )
    }
}