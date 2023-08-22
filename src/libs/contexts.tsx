

import {createContext, Dispatch} from "react"

import {AppDataContextType, AppUiStateType, AppUiActionType } from "./Types"


const appDataContext = createContext<AppDataContextType>({
    collections: [],
    currentCollection: null,
    notes: []
})

const appUiContext = createContext<{
    appUiState: AppUiStateType,
    appUiDispatch: Dispatch<AppUiActionType>
}>({
    appUiState: {uiMode: "light"},
    appUiDispatch: ()=>{}
})


export {appDataContext, appUiContext}