"use client"

import React, { useState, useRef, useEffect } from "react"

export default function CreateCollection() {


    const [formState, setFormState] = useState(
        { collectionName: "" }
    )

    const collectionNameRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        collectionNameRef.current?.focus();
        console.log("collectionNameRef is focused");
    }, [])

    function formSubmitHandler(e: React.FormEvent) {
        e.preventDefault();

        console.log(formState);
    }

    function collectionNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState((prev) => {
            return { ...prev, collectionName: e.target.value }
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
                        <button className="w-full bg-green-600 text-neutral-100 py-4 px-8 rounded-2xl">Create Collection</button>
                    </div>
                </div>
            </form>
        </div>
    )
}