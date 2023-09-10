
"use client"

import React, { useState } from "react"

//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import AddButtonGroup from "@/components/AddButtonGroup"

export default function FloatingPlusButton() {

    const [showButtonGroup, setShowButtonGroup] = useState(false)

    function floatingButtonClickHandler() {
        setShowButtonGroup((prevState) => {
            return prevState ? false : true
        })
    }

    return (
        <div className="flex flex-col gap-4 fixed bottom-4 right-4 z-50"> {/*container*/}

            {showButtonGroup && <AddButtonGroup justify="end" />}

            <div className="flex flex-row justify-end">
                <button
                    className="rounded-2xl h-16 w-16 bg-green-600 text-neutral-200"
                    onClick={floatingButtonClickHandler}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    )
}