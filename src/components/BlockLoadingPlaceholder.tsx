import React from "react"

import styles from "./BlockLoadingPlaceholder.module.css"

export default function BlockLoadingPlaceholder() {
    return (

        <div className={`${styles.placeholderLoading} flex justify-center items-center rounded-2xl`}>
            loading
        </div>
    )
}