"use client"
//react specific libs
import { useContext } from "react"


import { appUiContext } from "./contexts"


function InitAppUiState(): null { //should be called on every page
    const { appUiDispatch } = useContext(appUiContext)

    if (localStorage.getItem("app_ui_state") !== null) {
        appUiDispatch({ type: "initilize_app_ui", payload: { appUiState: JSON.parse(localStorage.getItem("app_ui_state")!) } })
    }
    
    return null
}

export { InitAppUiState }