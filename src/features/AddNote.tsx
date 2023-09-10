
"use client"

import { useState, useRef, useEffect, useContext } from "react";
import { appDataContext, appUiContext } from "@/libs/contexts";

import { mutate } from "swr"

import { ArrowDown2 as ArrowDownIcon } from "iconsax-react";
import { NoteDataType } from "@/libs/Types";
import { useCollections, useNotes } from "@/libs/getDataFromBackend";
import { postNoteToBackend } from "@/libs/postDataToBackend";
import ErrorComponent from "@/components/ErrorComponent";


export default function AddNote() {
    const { appDataState, appDataDispatch } = useContext(appDataContext);
    const { appUiState, appUiDispatch } = useContext(appUiContext);

    const { collectionsData, isLoading: isCollectionsDataLoading } = useCollections();
    const { notesData, isNotesLoading } = useNotes() //we pass the currentCollection Id instead

    const formRef = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);

    const [formState, setFormState] = useState({
        titleValue: "",
        bodyValue: "",

        focusWithin: false,
        selectedCollection: {
            collectionName: appDataState.currentCollection.collectionName,
            _collectionId: appDataState.currentCollection._collectionId,
        },
        showCollectionSelectOptions: false
    })

    const [formValidationState, setFormValidationState] = useState({
        isFormDataValid: false,
        errorsIfAny: [""],
        showError: false
    })

    // pass the focus to the title input
    useEffect(() => {
        titleRef.current?.focus()
    }, [])

    useEffect(() => {
        let { errorsIfAny, isFormDataValid } = validateFormData();

        setFormValidationState((prevState) => {
            return { ...prevState, errorsIfAny, isFormDataValid }
        })

    }, [formState])

    //test code
    useEffect(() => {
        console.log(formState.selectedCollection)
    }, [formState.selectedCollection])

    function validateFormData(): { isFormDataValid: boolean, errorsIfAny: string[] } {
        let isFormDataValid: boolean = true;
        const errorsIfAny: string[] = [];

        if (formState.bodyValue.length + formState.titleValue.length == 0) {
            isFormDataValid = false;
            errorsIfAny.push("Your note cannot be empty")
        }

        return { isFormDataValid, errorsIfAny }
    }

    function setShowError(): void {
        setFormValidationState((prevState) => {
            return { ...prevState, showError: true }
        })
    }

    function formFocusWithinHandler() {
        setFormState((prev) => {
            return { ...prev, focusWithin: true }
        })
    }

    function titleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setShowError();

        setFormState((prev) => {
            return { ...prev, titleValue: e.target.value }
        })
    }

    function bodyChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        //we recognize tht the form has been touched
        setShowError();

        setFormState((prev) => {
            return { ...prev, bodyValue: e.target.value }
        })
    }

    function submitHandler(e: React.FormEvent) {
        let notesDataCopy: NoteDataType[] = notesData ? notesData?.notes.slice(0) : []

        e.preventDefault();

        if (formValidationState.isFormDataValid) {//isFormData valid
            //just for the visual of having something happening right after addition
            mutate(`/notes?_collectionId=${formState.selectedCollection._collectionId}`, { ...notesData, notes: [...notesDataCopy, { _id: "", body: formState.bodyValue, title: formState.titleValue, tags: [], _ownerCollectionId: formState.selectedCollection._collectionId, creationDate: "", lastModified: "" } as NoteDataType] })

            postNoteToBackend({ _id: "", _ownerCollectionId: formState.selectedCollection._collectionId, title: formState.titleValue, body: formState.bodyValue, tags: [], creationDate: "", lastModified: "" }).then((response) => {
                console.log(response)
            }).then(() => {
                mutate(`/notes?_collectionId=${formState.selectedCollection._collectionId}`)
            })

            appUiDispatch({ type: "hide_modal" })
        }

    }

    //
    function collectionSelectButtonHandler({ collectionName, _collectionId }: { collectionName: string, _collectionId: string }) { //the function called each time a collection select option is clicked on
        setFormState((prevState) => {
            return { ...prevState, selectedCollection: { collectionName: collectionName, _collectionId: _collectionId } }
        })

        toggleCollectionSelectOptionsHandler();
    }

    function toggleCollectionSelectOptionsHandler() { //toggle view

        setFormState((prevState) => {
            return { ...prevState, showCollectionSelectOptions: prevState.showCollectionSelectOptions ? false : true }
        })

    }

    if (isCollectionsDataLoading || isNotesLoading) return (<div>loading ...</div>)
    else return (

        <div className={"rounded-3xl max-w-lg w-full p-4 shadow-md " + `${appUiState.uiMode == "light" ? "bg-zinc-100" : "bg-zinc-800"}`}>
            <div className="text-base  text-neutral-400"> {/* collection selector*/}
                <button onClick={toggleCollectionSelectOptionsHandler} className="p-2 font-semibold">
                    <div className="flex flex-row gap-2 items-center">
                        <span>{formState.selectedCollection.collectionName}</span>
                        <span><ArrowDownIcon size="16" /></span>
                    </div>
                </button>
                <div className={`relative`}>
                    {
                        formState.showCollectionSelectOptions && 
                        <div 
                        className={"absolute flex flex-col w-fit items-start shadow-md rounded-lg overflow-hidden " + `${appUiState.uiMode == "light"? "bg-zinc-50" : "bg-zinc-900"}`}>
                            {collectionsData?.collections.map((eachCollection, index) => {
                                return (<button key={index}
                                    onClick={() => { collectionSelectButtonHandler({ collectionName: eachCollection.collectionName, _collectionId: eachCollection._collectionId }) }}
                                    className={"py-1 px-4 bg-transparent font-normal " + `${appUiState.uiMode == "light"? "text-zinc-700" : "text-zinc-500"}`}>{eachCollection.collectionName}</button>)
                            })}
                        </div>
                    }
                </div>
            </div>
            <form ref={formRef} action="" onSubmit={submitHandler} onFocus={formFocusWithinHandler}>

                <div className="flex flex-col gap-4">
                    <div className={"flex flex-col gap-2 rounded-2xl p-2 outline outline-1  " +  `${appUiState.uiMode == "light"? "outline-zinc-300 focus-within:shadow-md " : "outline-zinc-700 focus-within:shadow-2xl "}`}>
                        <input
                            ref={titleRef}
                            maxLength={50}
                            type="text"
                            onChange={titleChangeHandler}
                            value={formState.titleValue}
                            placeholder="Take a note"
                            className={"focus:outline-none font-medium text-lg bg-transparent " + `${appUiState.uiMode == "light" ? "text-zinc-900 placeholder:text-zinc-400" : "text-zinc-500 placeholder:text-zinc-700"}`} />
                        <textarea
                            placeholder={"the main content of your note goes here!"}
                            maxLength={200}
                            ref={bodyRef}
                            onChange={bodyChangeHandler}
                            value={formState.bodyValue}
                            spellCheck={false}
                            className={"focus:outline-none font-normal min-h-[8em] resize-none bg-transparent " + `${appUiState.uiMode == "light"? "text-zinc-700 placeholder:text-zinc-400" : "text-zinc-600 placeholder:text-zinc-700"}`} />
                        <div className="text-xs font-normal text-neutral-400">{formState.bodyValue.length + formState.titleValue.length} Characters</div>
                    </div>

                    {
                        formValidationState.isFormDataValid == false && formValidationState.showError == true && <div>
                            {formValidationState.errorsIfAny.map((eachErrorString, index) => {
                                return <ErrorComponent label={eachErrorString} key={index} />
                            })}
                        </div>
                    }

                    <div>
                        <button className="w-full bg-green-600 text-neutral-100 py-4 px-8 rounded-2xl disabled:bg-neutral-500" disabled={formValidationState.isFormDataValid == false && formValidationState.showError}>Add</button>
                    </div>
                </div>
            </form>
        </div>

    )
}
