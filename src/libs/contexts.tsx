

import { createContext, Dispatch } from "react"

import { AppDataStateType, AppUiStateType, AppDataActionType, AppUiActionType } from "./Types"


const appDataContext = createContext<{
    appDataState: AppDataStateType,
    appDataDispatch: Dispatch<AppDataActionType>
}>({
    appDataState: {
        collections: [],
        currentCollection: null,
        notes: []
    },
    appDataDispatch: () => { }
})


const appUiContext = createContext<{
    appUiState: AppUiStateType,
    appUiDispatch: Dispatch<AppUiActionType>
}>({
    appUiState: { uiMode: "light" },
    appUiDispatch: () => { }
})


export { appDataContext, appUiContext }