"use client"
//next specific imports
import { } from "next/router"

//react specific libs
import { useContext, useEffect } from "react"


import { appUiContext } from "./contexts"


function InitAppUiState(): null { //should be called on every page
    const { appUiState, appUiDispatch } = useContext(appUiContext)

    useEffect(() => {
        if (localStorage.getItem("app_ui_state") !== null) {
            appUiDispatch({ type: "initilize_app_ui", payload: { appUiState: JSON.parse(localStorage.getItem("app_ui_state")!) } })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("app_ui_state", JSON.stringify(appUiState))
    }, [appUiState])

    return null
}

export { InitAppUiState }