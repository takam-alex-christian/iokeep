
"use client"

import { useState, useRef, useEffect, useContext } from "react";
import { appDataContext } from "@/libs/contexts";

import { ArrowDown2 as ArrowDownIcon } from "iconsax-react";


export default function AddNote() {

    const { appDataState } = useContext(appDataContext);

    const formRef = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);

    const [formState, setFormState] = useState({
        titleValue: "",
        bodyValue: "",
        focusWithin: false,
        selectedCollectionName: appDataState.currentCollection,
        showCollectionSelectOptions: false
    })

    // pass the focus to the title input
    useEffect(() => {
        titleRef.current?.focus()
    }, [])

    useEffect(() => {
        console.log(formState)
    }, [formState])

    useEffect(() => {
        console.log(appDataState)
    })

    function formFocusWithinHandler() {
        setFormState((prev) => {
            return { ...prev, focusWithin: true }
        })
    }

    function titleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState((prev) => {
            return { ...prev, titleValue: e.target.value }
        })
    }

    function bodyChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setFormState((prev) => {
            return { ...prev, bodyValue: e.target.value }
        })
    }

    function submitHandler(e: React.FormEvent): void {

        e.preventDefault();

        console.log("editor submited");
    }

    //
    function collectionSelectButtonHandler(collectionName: string) { //the function called each time a collection select option is clicked on
        setFormState((prevState) => {
            return { ...prevState, selectedCollection: collectionName }
        })
    }

    function toggleCollectionSelectOptionsHandler() {
        setFormState((prevState) => {
            return { ...prevState, showCollectionSelectOptions: prevState.showCollectionSelectOptions ? false : true }
        })
    }

    return (

        <div className="rounded-3xl max-w-lg w-full p-4 bg-white">
            <div> {/* collection selector*/}
                <button onClick={toggleCollectionSelectOptionsHandler}>
                    <div className="flex flex-row gap-2 items-center">
                        <span>{appDataState.currentCollection}</span>
                        <span><ArrowDownIcon size="16" /></span>
                    </div>
                </button>
                <div className="relative">
                    {
                        formState.showCollectionSelectOptions && <div className="absolute flex flex-col gap-0  items-start bg-white ">
                            {appDataState.collections.map((eachCollection) => {
                                return (<button onClick={() => { collectionSelectButtonHandler(eachCollection.name) }} className="">{eachCollection.name}</button>)
                            })}
                        </div>
                    }
                </div>
            </div>
            <form ref={formRef} action="" onSubmit={submitHandler} onFocus={formFocusWithinHandler}>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 rounded-2xl p-2 focus-within:outline focus-within:outline-1 focus-within:outline-neutral-300">
                        <input ref={titleRef} maxLength={50} type="text" onChange={titleChangeHandler} value={formState.titleValue} placeholder="Take a note" className="focus:outline-none  text-neutral-600 font-bold text-lg" />
                        <textarea maxLength={200} ref={bodyRef} onChange={bodyChangeHandler} value={formState.bodyValue} spellCheck={false} className="focus:outline-none min-h-[8em] resize-none text-neutral-500" />
                        <div className="text-xs font-normal text-neutral-400">{formState.bodyValue.length + formState.titleValue.length} Characters</div>
                    </div>

                    <div>
                        <button className="w-full bg-green-600 text-neutral-100 py-4 px-8 rounded-2xl">Add</button>
                    </div>
                </div>
            </form>
        </div>


    )
}
