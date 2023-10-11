
"use client"

import { useState, useReducer, useRef, useEffect, useContext } from "react";
import { appDataContext, appUiContext } from "@/libs/contexts";

import { mutate } from "swr"

import { ArrowDown2 as ArrowDownIcon } from "iconsax-react";
import { CollectionDataType, NoteDataType } from "@/libs/Types";
import { useCollections, useNotes } from "@/libs/getDataFromBackend";
import { postNoteToBackend } from "@/libs/postDataToBackend";
import ErrorComponent from "@/components/ErrorComponent";

import theme from "@/libs/theme";
import PrimaryButton from "@/components/PrimaryButton";
import { updateNoteToBackend } from "@/libs/noteUtilities";


type FormStateType = {
    title: string,
    body: string,

    selectedCollection: {
        collectionName: string,
        _collectionId: string,
    },

    isLoading: boolean,

    showCollectionSelectOptions: boolean
}

type FormStateReducerActionType = { type: "init_form", payload: FormStateType }
    | { type: "update_title", payload: { value: string } }
    | { type: "update_body", payload: { value: string } }

    | { type: "start_loading" }
    | { type: "stop_loading" }

    | { type: "select_collection", payload: CollectionDataType }

    | { type: "show_collection_select" }
    | { type: "hide_collection_select" }



function formStateReducer(prevState: FormStateType, action: FormStateReducerActionType): FormStateType {
    switch (action.type) {
        case "init_form": {
            return { ...action.payload }
        }
        case "update_title": {
            return { ...prevState, title: action.payload.value }
        }
        case "update_body": {
            return { ...prevState, body: action.payload.value }
        }

        case "start_loading": {
            return { ...prevState, isLoading: true }
        }
        case "stop_loading": {
            return { ...prevState, isLoading: false }
        }

        case "select_collection": {
            return { ...prevState, selectedCollection: { _collectionId: action.payload._collectionId, collectionName: action.payload.collectionName } }
        }

        case "show_collection_select": {
            return { ...prevState, showCollectionSelectOptions: true }
        }

        case "hide_collection_select": {
            return { ...prevState, showCollectionSelectOptions: false }
        }

        default: return prevState

    }
}


export default function AddNote(props: { edit?: boolean, noteData?: NoteDataType }) {

    //we start by checking whether we are editing a note or not
    const isInEdit = typeof (props.edit) !== "undefined" && typeof (props.noteData) !== "undefined" && props.edit == true;

    const { appDataState, appDataDispatch } = useContext(appDataContext);
    const { appUiState, appUiDispatch } = useContext(appUiContext);

    const { collectionsData, isLoading: isCollectionsDataLoading } = useCollections();
    const { notesData, isNotesLoading } = useNotes() //we pass the currentCollection Id instead

    //theming
    const themeData = { colors: appUiState.uiMode == "dark" ? theme.colors.dark : theme.colors.light }

    const formRef = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);


    //and we assign note data to state data if it is provided anyways
    const [formState, formStateDispatch] = useReducer<React.Reducer<FormStateType, FormStateReducerActionType>>(formStateReducer, {
        title: isInEdit ? props.noteData?.title! : "",
        body: isInEdit ? props.noteData?.body! : "",

        selectedCollection: {
            collectionName: appDataState.currentCollection.collectionName,
            _collectionId: appDataState.currentCollection._collectionId,
        },

        isLoading: false,

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

    function validateFormData(): { isFormDataValid: boolean, errorsIfAny: string[] } {
        let isFormDataValid: boolean = true;
        const errorsIfAny: string[] = [];

        if (formState.body.length + formState.title.length == 0) {
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

    function titleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setShowError();

        formStateDispatch({ type: "update_title", payload: { value: e.target.value } })
    }

    function bodyChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setShowError();

        formStateDispatch({type: "update_body", payload: {value: e.target.value}})
    }

    async function submitHandler(e: React.FormEvent) {
        //first start loading
        formStateDispatch({ type: "start_loading" })

        let notesDataCopy: NoteDataType[] = notesData ? notesData?.notes.slice(0) : []

        e.preventDefault();

        if (formValidationState.isFormDataValid) {


            if (isInEdit) {//we implement here what happen when we submit

                //we mutate thet state for visual appeal before inititiating anything on the backend
                // mutate(`/notes?_collectionId=${appDataState.currentCollection._collectionId}`, {...notesData, notes: [...]} )

                let { updated, message, isError } = await updateNoteToBackend({ _id: props.noteData?._id, title: formState.title, body: formState.body });

                if (updated == true && isError == false) {
                    console.log(message)

                    mutate(`/notes?_collectionId=${appDataState.currentCollection._collectionId}`)

                    formStateDispatch({ type: "stop_loading" })

                } //

                appUiDispatch({ type: "hide_modal" })

            } else {

                //just for the visual of having something happening right after addition
                mutate(`/notes?_collectionId=${formState.selectedCollection._collectionId}`, { ...notesData, notes: [...notesDataCopy, { _id: "", body: formState.body, title: formState.title, tags: [], _ownerCollectionId: formState.selectedCollection._collectionId, creationDate: "", lastModified: "" } as NoteDataType] })

                await postNoteToBackend({ _id: "", _ownerCollectionId: formState.selectedCollection._collectionId, title: formState.title, body: formState.body, tags: [], creationDate: "", lastModified: "" }).then((response) => {
                    console.log(response)

                    formStateDispatch({ type: "stop_loading" })

                }).then(() => {
                    mutate(`/notes?_collectionId=${formState.selectedCollection._collectionId}`)
                })

                appUiDispatch({ type: "hide_modal" })

            }
        }



    }

    //
    function collectionSelectButtonHandler({ collectionName, _collectionId }: { collectionName: string, _collectionId: string }) { //the function called each time a collection select option is clicked on

        formStateDispatch({ type: "select_collection", payload: { collectionName: collectionName, _collectionId: _collectionId } })

        toggleCollectionSelectOptionsHandler();
    }

    function toggleCollectionSelectOptionsHandler() { //toggle view
        if (formState.showCollectionSelectOptions == true) formStateDispatch({ type: "show_collection_select" })
        else formStateDispatch({ type: "hide_collection_select" })
    }

    if (isCollectionsDataLoading || isNotesLoading) return (<div>loading ...</div>)
    else return (

        <div className={"rounded-3xl max-w-lg w-full p-4 shadow-md " + `${appUiState.uiMode == "light" ? "bg-zinc-100" : "bg-zinc-800"}`}>

            {props.edit ?

                //on note edition
                <div className={`text-lg font-medium p-2 ${themeData.colors.onSurface} `}>{formState.selectedCollection.collectionName}</div>
                :
                // on note creation
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
                                className={"absolute flex flex-col w-fit items-start shadow-md rounded-lg overflow-hidden " + `${appUiState.uiMode == "light" ? "bg-zinc-50" : "bg-zinc-900"}`}>
                                {collectionsData?.collections.map((eachCollection, index) => {
                                    return (<button key={index}
                                        onClick={() => { collectionSelectButtonHandler({ collectionName: eachCollection.collectionName, _collectionId: eachCollection._collectionId }) }}
                                        className={"py-1 px-4 bg-transparent font-normal " + `${appUiState.uiMode == "light" ? "text-zinc-700" : "text-zinc-500"}`}>{eachCollection.collectionName}</button>)
                                })}
                            </div>
                        }
                    </div>
                </div>
            }

            <form ref={formRef} action="" onSubmit={submitHandler}>

                <div className="flex flex-col gap-4">
                    <div className={"flex flex-col gap-2 rounded-2xl p-2 outline outline-1  " + `${appUiState.uiMode == "light" ? "outline-zinc-300 focus-within:shadow-md " : "outline-zinc-700 focus-within:shadow-2xl "}`}>
                        <input
                            ref={titleRef}
                            maxLength={50}
                            type="text"
                            onChange={titleChangeHandler}
                            value={formState.title}
                            placeholder="Take a note"
                            className={"focus:outline-none font-medium text-lg bg-transparent " + `${appUiState.uiMode == "light" ? "text-zinc-900 placeholder:text-zinc-400" : "text-zinc-500 placeholder:text-zinc-700"}`} />
                        <textarea
                            placeholder={"the main content of your note goes here!"}
                            maxLength={200}
                            ref={bodyRef}
                            onChange={bodyChangeHandler}
                            value={formState.body}
                            spellCheck={false}
                            className={"focus:outline-none font-normal min-h-[8em] resize-none bg-transparent " + `${appUiState.uiMode == "light" ? "text-zinc-700 placeholder:text-zinc-400" : "text-zinc-600 placeholder:text-zinc-700"}`} />
                        <div className="text-xs font-normal text-neutral-400">{formState.body.length + formState.title.length} Characters</div>
                    </div>

                    {
                        formValidationState.isFormDataValid == false && formValidationState.showError == true && <div>
                            {formValidationState.errorsIfAny.map((eachErrorString, index) => {
                                return <ErrorComponent label={eachErrorString} key={index} />
                            })}
                        </div>
                    }

                    <div>
                        {/* <button className="w-full bg-green-600 text-neutral-100 py-4 px-8 rounded-2xl disabled:bg-neutral-500">Add</button> */}
                        <PrimaryButton isLoading={formState.isLoading}>{isInEdit ? "Save Changes" : "Add"}</PrimaryButton>
                    </div>
                </div>
            </form>
        </div>

    )
}
