

// note related types
export type NoteDataType = {
    id: string,
    title: string,
    body: string,
    tags: string[],
    creationDate: Date | string,
    lastModified: Date | string
}

export type CollectionDataType = {collectionName: string, _id: string, notes?: NoteDataType[]}

export type UserDataType = { //data about the user
    username: string,

    // _authToken: string
}

export type AppDataStateType = {
    collections: CollectionDataType[],
    currentCollection: {
        collectionName: string,
        _collectionId: string
    },
}

export type AppDataActionType = { type: "create_collection", payload: { collectionName: string } }
| {type: "switch_current_collection", payload: {collectionName: string}}
| {type: "add_note", payload: {
    collectionName: string,
    noteData: NoteDataType
}}

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
    | {type: "hide_modal"}

// export type NotesContextType ={
//     noteList: NoteData[],
// } 