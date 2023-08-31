

import { createContext, Dispatch } from "react"

import { AppDataStateType, AppUiStateType, AppDataActionType, AppUiActionType } from "./Types"


const appDataContext = createContext<{
    appDataState: AppDataStateType,
    appDataDispatch: Dispatch<AppDataActionType>
}>({
    appDataState: {
        collections: [],
        currentCollection: {
            collectionName: "",
            _collectionId: ""
        },
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

//auth related contexts



export { appDataContext, appUiContext }