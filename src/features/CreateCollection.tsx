"use client"

import React, { useState, useRef, useEffect, useContext } from "react"

import { appDataContext, appUiContext } from "@/libs/contexts";

import { mutate } from "swr";

import { useCollections } from "@/libs/getDataFromBackend";
import { CollectionDataType } from "@/libs/Types";
import { postCollectionToBackend } from "@/libs/postDataToBackend";

import ErrorComponent from "@/components/ErrorComponent";

export default function CreateCollection() {

    const { collectionsData, isLoading: isCollectionsDataLoading, setCollectionsData } = useCollections()

    const { appDataDispatch, appDataState } = useContext(appDataContext)
    const { appUiDispatch, appUiState } = useContext(appUiContext)

    const [formState, setFormState] = useState({ collectionName: "" })

    const [formValidation, setFormValidation] = useState({
        isCollectionNameValid: false,
        showError: false,
        errors: [""]
    })

    const collectionNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        collectionNameRef.current?.focus();
    }, [])

    useEffect(() => {
        let collectionValidationObject = validateCollectionName();

        setFormValidation((prevState) => {
            return { ...prevState, isCollectionNameValid: collectionValidationObject.isValid, errors: collectionValidationObject.errors }
        })

    }, [formState.collectionName])

    function validateCollectionName() {
        let isValid: boolean = true;
        let errors: string[] = [];

        if (formState.collectionName.length == 0) {
            isValid = false;
            errors.push(" collection name cannot be empty")
        }

        collectionsData?.collections.forEach((eachCollection) => {
            if (eachCollection.collectionName.toLowerCase() == formState.collectionName.toLowerCase()) {
                isValid = false;
                errors.push(`A collection already exist with the name ${formState.collectionName}`);
            }
        })

        return { isValid, errors }
    }

    function formSubmitHandler(e: React.FormEvent) {

        e.preventDefault();

        setCollectionsData({ ...collectionsData, collections: [...(collectionsData ? collectionsData?.collections.slice(0) : []), { collectionName: formState.collectionName, _collectionId: "" }] })
        mutate("/collections")

        postCollectionToBackend({
            collectionName: formState.collectionName,
            _collectionId: ""
        })

        appUiDispatch({ type: "hide_modal" });

    }

    function collectionNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        setFormState((prev) => {
            if (prev.collectionName.length > 0) setFormValidation((prevState) => { return { ...prevState, showError: true } })
            return { ...prev, collectionName: e.target.value }
        })

    }

    return (
        <div className={"rounded-3xl max-w-lg w-full p-4 shadow-xl " + `${appUiState.uiMode == "light" ? "bg-zinc-100 " : "bg-zinc-800"}`}>
            <form action="" onSubmit={formSubmitHandler}>
                <div className="flex flex-col gap-4">
                    <div
                        className={" rounded-2xl overflow-hidden outline outline-1  " + `${appUiState.uiMode == "light" ? "outline-zinc-300  focus-within:shadow-md " : "outline-zinc-700 focus-within:shadow-2xl"}`}>
                        
                        <input 
                        ref={collectionNameRef} 
                        type="text" 
                        onChange={collectionNameChangeHandler} 
                        value={formState.collectionName} 
                        placeholder="Collection Name" 
                        className={"w-full p-4 text-base font-semibold focus:outline-none bg-transparent " + `${appUiState.uiMode == "light"? "text-zinc-900 placeholder:text-zinc-400" : "text-zinc-500 placeholder:text-zinc-700"}`} />
                    </div>

                    {formValidation.isCollectionNameValid == false && formValidation.showError && formValidation.errors.map((eachError, index) => {
                        return (<ErrorComponent key={index} label={eachError} />)
                    })}

                    <div>
                        <button className={`w-full bg-green-600 text-neutral-100 py-4 px-8 rounded-2xl disabled:bg-neutral-500`} disabled={formValidation.isCollectionNameValid !== true && formValidation.showError == true ? true : false}>Create Collection</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
