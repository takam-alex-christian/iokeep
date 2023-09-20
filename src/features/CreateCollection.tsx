"use client"

import React, { useState, useRef, useEffect, useContext, useReducer } from "react"

import { appDataContext, appUiContext } from "@/libs/contexts";

import { mutate } from "swr";

import { useCollections } from "@/libs/getDataFromBackend";
import { CollectionDataType } from "@/libs/Types";
import { postCollectionToBackend } from "@/libs/postDataToBackend";

import ErrorComponent from "@/components/ErrorComponent";
import Col from "@/layouts/Col";
import PrimaryButton from "@/components/PrimaryButton";

type MessageType = "success" | "warning" | "error" | null

type CollectionFormStateType = {
    collectionNameValue: string,

    isLoading: boolean,
    showMessage: boolean,
    message: string,
    messageType: MessageType,
}

type CollectionFormReducerActionType = { type: "update_collectionName", payload: { value: string } }
    | { type: "start_loading" }
    | { type: "stop_loading" }
    | { type: "show_message" }
    | { type: "hide_message" }

    | { type: "update_message", payload: { value: string, type: MessageType } }

export default function CreateCollection() {

    const [collectionState, collectionDispatch] = useReducer((prevState: CollectionFormStateType, action: CollectionFormReducerActionType) => {
        switch (action.type) {
            case "update_collectionName": return { ...prevState, collectionNameValue: action.payload.value }
            
            case "start_loading": return { ...prevState, isLoading: true }
            case "stop_loading": return { ...prevState, isLoading: false }
            
            case "show_message": return { ...prevState, showMessage: true }
            case "hide_message": return { ...prevState, showMessage: false }
            
            case "update_message": return { ...prevState, message: action.payload.value, messageType: action.payload.type, showMessage: true }
            default: return prevState;
        }
    }, { collectionNameValue: "", message: "", messageType: null, showMessage: false, isLoading: false } as CollectionFormStateType)

    const { collectionsData, isLoading: isCollectionsDataLoading, setCollectionsData } = useCollections()

    const { appDataDispatch, appDataState } = useContext(appDataContext)
    const { appUiDispatch, appUiState } = useContext(appUiContext)

    // const [formState, setFormState] = useState<{ collectionNameValue: string, showMessage: boolean, message: string, isError: false }>({ collectionNameValue: "", isError: false, showMessage: false, message: "" })

    const collectionNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        collectionNameRef.current?.focus();
    }, [])

    function formSubmitHandler(e: React.FormEvent) {
        
        //show with a loader that the request is being processed
        collectionDispatch({type:"start_loading"})

        let message: string = ""
        let messageType: MessageType = null

        e.preventDefault();


        if (collectionState.collectionNameValue.length > 0) {
            //life is even better
            collectionsData?.collections.forEach((eachCollection) => {
                if (eachCollection.collectionName.toLowerCase() == collectionState.collectionNameValue.toLowerCase()) {

                    message = `A collection already exist with the name ${collectionState.collectionNameValue}`
                    messageType = "error"
                }
            })

            //validated, what do we do now

            if (messageType !== "error") {

                setCollectionsData({ ...collectionsData, collections: [...(collectionsData ? collectionsData.collections.slice(0) : []), { collectionName: collectionState.collectionNameValue, _collectionId: "" }] })

                postCollectionToBackend({
                    collectionName: collectionState.collectionNameValue,
                    _collectionId: ""
                }).then((result) => {
                    console.log(result)
                    mutate("/collections")
                })

                appUiDispatch({ type: "hide_modal" });

            } else {
                collectionDispatch({ type: "update_message", payload: { value: message, type: messageType } })
            }

        } else {
            collectionDispatch({ type: "update_message", payload: { value: "Collection name can not be empty!", type: "error" } })
        }


        collectionDispatch({type:"stop_loading"})

    }

    function collectionNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        e.preventDefault();

        collectionDispatch({type: "update_collectionName", payload: {value: e.target.value}})

    }

    return (
        <div className={"rounded-3xl max-w-lg w-full p-4 shadow-xl " + `${appUiState.uiMode == "light" ? "bg-zinc-100 " : "bg-zinc-800"}`}>
            <form action="" onSubmit={formSubmitHandler}>
                <div className="flex flex-col gap-4">
                    <Col gap={2}>
                        <div
                            className={" rounded-2xl overflow-hidden outline outline-1  " + `${appUiState.uiMode == "light" ? "outline-zinc-300  focus-within:shadow-md " : "outline-zinc-700 focus-within:shadow-2xl"}`}>

                            <input
                                ref={collectionNameRef}
                                type="text"
                                onChange={collectionNameChangeHandler}
                                value={collectionState.collectionNameValue}
                                placeholder="Collection Name"
                                className={"w-full p-4 text-base font-semibold focus:outline-none bg-transparent " + `${appUiState.uiMode == "light" ? "text-zinc-900 placeholder:text-zinc-400" : "text-zinc-500 placeholder:text-zinc-700"}`} />
                        </div>

                        {collectionState.showMessage && <ErrorComponent label={collectionState.message} />}

                    </Col>

                    <div>
                        <PrimaryButton>{ collectionState.isLoading? "Loading": "Create Collection"}</PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    )
}
