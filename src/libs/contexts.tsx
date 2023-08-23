

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
    appUiState: { uiMode: "light", modalOverlay: false, currentModalView: null},
    appUiDispatch: () => { }
})


export { appDataContext, appUiContext }