"use client"

import React, {useState} from "react"

export default function CreateCollection() {

    const [formState, setFormState] = useState(
        {collectionName: ""}
    )

    function formSubmitHandler(e: React.FormEvent){
        e.preventDefault();

        console.log(formState);
    }

    function collectionNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
        setFormState((prev)=>{
            return {...prev, collectionName: e.target.value}
        })
    }

    return (
        <div className="rounded-3xl max-w-lg w-full p-4 bg-white">
            <form action="" onSubmit={formSubmitHandler}>
                <input type="text" onChange={collectionNameChangeHandler} value={formState.collectionName} />
            </form>
        </div>
    )
}