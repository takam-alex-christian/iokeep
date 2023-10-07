

// note related types
export type NoteDataType = {
    _id: string,
    _ownerCollectionId?: string,

    title: string,
    body: string,
    tags: string[],

    creationDate: Date | string,
    lastModified: Date | string
}

export type CollectionDataType = { collectionName: string, _collectionId: string, notes?: NoteDataType[] }

export type UserDataType = { //data about the user
    username: string,

    // _authToken: string
}

export type AppDataStateType = {
    currentCollection: {
        collectionName: string,
        _collectionId: string
    }

    currentNote: NoteDataType
}

export type AppDataActionType = { type: "create_collection", payload: { collectionName: string } }
    | { type: "switch_current_collection", payload: { collectionName?: string, _collectionId?: string } }
    | { type: "switch_current_note", payload: NoteDataType }

export type AppUiStateType = {
    uiMode: "light" | "dark",
    modalOverlay?: boolean,
    currentModalView?: "create_collection" | "add_note" | "edit_note" | null
}

export type AppUiActionType =
    { type: "initilize_app_ui", payload: { appUiState: AppUiStateType } }
    | { type: "switched_ui_mode" }
    | {
        type: "show_modal", payload: {
            view: "create_collection" | "add_note" | "edit_note"
        }
    }
    | { type: "hide_modal" }

// export type NotesContextType ={
//     noteList: NoteData[],
// } 