
"use client"

import React, { useState, useRef, Suspense } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons"

export default function InputField(props: {

    placeholder?: string,
    className?: string,
    value?: string,
    onChangeHandler?: React.ChangeEventHandler
    type?: "text" | "password"
}) {
    //we add new features to a component
    //we create a state for isVisible
    const [isContentVisible, setIsContentVisible] = useState<boolean>(typeof(props.type) !== "undefined" && props.type == "password"? false : true)

    const fieldRef = useRef<HTMLInputElement>(null); //this ref will be used to return focus on the inpput field on hide/show

    function hideShowButtonHandler() {
        setIsContentVisible((prevState) => {
            return prevState ? false : true
        })

        fieldRef.current?.focus()
    }

    return (
        <div className='relative overflow-hidden outline outline-1 outline-neutral-300 rounded-2xl focus-within:outline focus-within:outline-1 focus-within:outline-green-300 '>
            <input ref={fieldRef} type={isContentVisible ? "text" : "password"} value={props.value} onChange={props.onChangeHandler} placeholder={props.placeholder} className={"w-full p-4 text-base font-semibold focus:outline-none" + " " + props.className} />
            <div className="absolute flex h-full justify-center items-center z-10 px-2 right-2 top-0 bg-white">
                {
                    typeof(props.type) != "undefined" && props.type == "password" && <button
                        className="focus:outline-none"
                        onClick={hideShowButtonHandler}><FontAwesomeIcon className="text-neutral-700" icon={isContentVisible ? faEyeSlash : faEye} />
                    </button>
                }
            </div>
        </div>
    )
}
