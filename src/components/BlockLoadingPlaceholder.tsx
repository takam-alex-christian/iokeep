import React, { useContext, useState, useEffect } from "react"

import { appUiContext } from "@/libs/contexts"

import styles from "./BlockLoadingPlaceholder.module.css"

export default function BlockLoadingPlaceholder() {

    const { appUiState } = useContext(appUiContext)


    return (

        <div className={`${styles.placeholderLoading} flex justify-center items-center rounded-2xl ${appUiState.uiMode == "light" ? styles.light : styles.dark}`}>
            <span className={`${appUiState.uiMode == 'light' ? "text-zinc-700" : "text-zinc-500"}`}>Loading...</span>
        </div>
    )
}