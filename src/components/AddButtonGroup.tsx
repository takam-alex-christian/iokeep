

import React, { useContext } from "react"

import { appUiContext } from "@/libs/contexts"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default function AddButtonGroup(props: { justify?: "start" | "center" | "end" }) {

    const { appUiDispatch } = useContext(appUiContext)

    function createCollectionButtonHandler(e: React.MouseEvent<HTMLButtonElement>) { //essentially what happens when you press the "create collection" button

        e.preventDefault();

        appUiDispatch({ type: "show_modal", payload: { view: "create_collection" } })

    }


    function addNoteButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();


        appUiDispatch({ type: "show_modal", payload: { view: "add_note" } });
    }

    return (
        <div className={` flex flex-col gap-2  `}>
            <div className="flex flex-row w-full justify-end">
                <button
                    onClick={createCollectionButtonHandler}
                    className=" w-fit bg-stone-100 rounded-2xl">
                    <div className="flex flex-row items-center gap-4 p-4">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>New collection</span>
                    </div>

                </button>
            </div>
            <div className={`flex flex-row w-full justify-${typeof(props.justify) !== "undefined"? props.justify : "start"}`}>
                <button
                    onClick={addNoteButtonHandler}
                    className="relative right-0 w-fit bg-green-600 text-white rounded-2xl">
                    <div className="flex flex-row items-center gap-4 p-4">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add Note</span>
                    </div>
                </button>
            </div>
        </div>
    )
}