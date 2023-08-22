

// note related types
export type NoteDataType = {
    id: string,
    title: string,
    body: string,
    tags: string[],
    collection: string,
    creationDate: Date | string,
    lastModified: Date | string
}

export type AppDataContextType = {
    collections: string[],
    currentCollection: string | null, 
    notes: NoteDataType[],
}

export type AppUiStateType = {
    uiMode: "light" | "dark",
}

export type AppUiActionType = {type: "switched_ui_mode"}

// export type NotesContextType ={
//     noteList: NoteData[],
// } 