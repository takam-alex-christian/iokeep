"use client"

import React, { useState, useRef, useEffect, useContext } from "react"

import { appDataContext, appUiContext } from "@/libs/contexts";

import { mutate } from "swr";

import { useCollections } from "@/libs/getDataFromBackend";
import { CollectionDataType } from "@/libs/Types";
import { postCollectionToBackend } from "@/libs/postDataToBackend";

export default function CreateCollection() {

    const { collectionsData, isLoading: isCollectionsDataLoading, setCollectionsData } = useCollections()

    const { appDataDispatch } = useContext(appDataContext)
    const { appUiDispatch } = useContext(appUiContext)

    const [formState, setFormState] = useState(
        { 
            collectionName: "",
            isCollectionNameAvailable: true
        }
    )

    const collectionNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        collectionNameRef.current?.focus();
        console.log("collectionNameRef is focused");
    }, [])


    function formSubmitHandler(e: React.FormEvent) {

        
        e.preventDefault();

        //old fashion of adding collections. this line could be cleared without consequences
        appDataDispatch({ type: "create_collection", payload: { collectionName: formState.collectionName } })

        setCollectionsData({...collectionsData, collections: [...(collectionsData ? collectionsData?.collections.slice(0) : []), { collectionName: formState.collectionName, _collectionId: "" }] })
        mutate("/collections")
        
        postCollectionToBackend({
            collectionName: formState.collectionName,
            _collectionId: ""
        })

        appUiDispatch({ type: "hide_modal" });

    }

    function collectionNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        
        let isAvailable: boolean

        collectionsData?.collections.forEach((eachCollection)=>{
            isAvailable = eachCollection.collectionName !== e.target.value? true : false;
        })

        setFormState((prev) => {
            return { ...prev, collectionName: e.target.value, isCollectionNameAvailable: isAvailable }
        })

    }

    return (
        <div className="rounded-3xl max-w-lg w-full p-4 bg-white">
            <form action="" onSubmit={formSubmitHandler}>
                <div className="flex flex-col gap-4">
                    <div className=" rounded-2xl focus-within:outline focus-within:outline-1 focus-within:outline-neutral-300 ">
                        <input ref={collectionNameRef} type="text" onChange={collectionNameChangeHandler} value={formState.collectionName} placeholder="Collection Name" className="w-full p-4 text-base font-semibold focus:outline-none" />
                    </div>
                    <div>
                        <button className={`w-full bg-green-600 text-neutral-100 py-4 px-8 rounded-2xl disabled:bg-neutral-500`} disabled={formState.isCollectionNameAvailable? false : true}>Create Collection</button>
                    </div>
                </div>
            </form>
        </div>
    )
}