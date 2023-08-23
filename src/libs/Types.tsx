

// note related types
export type NoteDataType = {
    id: string,
    title: string,
    body: string,
    tags: string[],
    creationDate: Date | string,
    lastModified: Date | string
}

export type AppDataStateType = {
    collections: CollectionType[],
    currentCollection: string,
}

export type CollectionType = {name: string, notes?: NoteDataType[]}


export type AppDataActionType = { type: "create_collection", payload: { collectionName: string } }
| {type: "switch_current_collection", payload: {collectionName: string}}

export type AppUiStateType = {
    uiMode: "light" | "dark",
    modalOverlay?: boolean,
    currentModalView?: "create_collection" | "add_note" | null
}

export type AppUiActionType = { type: "switched_ui_mode" }
    | {
        type: "show_modal", payload: {
            view: "create_collection" | "add_note"
        }
    }

// export type NotesContextType ={
//     noteList: NoteData[],
// } 