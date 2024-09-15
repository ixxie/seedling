

export type BlockType = 'p' | 'h'
export type BlockId = string
export type BlockFieldKey = string
export type BlockFieldValue<T> = T

export type Timestamp = string
export type UserId = string

export interface BlockContent {
    [prop: BlockFieldKey]: BlockFieldValue<unknown>
}

export interface BlockData {
    id: BlockId
    type: BlockType
    owner: UserId
    created: Timestamp
    modified: Timestamp
    content: BlockContent
}