
import {useContext} from "react"

import { appUiContext } from "@/libs/contexts"

import { SearchNormal1 } from "iconsax-react"

import React from 'react'

export default function SearchBar() {

    const {appUiState} = useContext(appUiContext)

    return (
        <div className="w-full">
            <form action="w-full">
                <div className={"flex flex-row justify-start border h-12 rounded-full " + `${appUiState.uiMode == "light"? "border-slate-200" : "border-zinc-600"}`}>
                    <label className="flex flex-row gap-4 h-full w-full px-4 items-center">
                        <div ><SearchNormal1 size="24" color="#474E41" variant="Outline" /></div>
                        <div className="flex-1"><input type="search" className="w-full focus:outline-none bg-inherit" placeholder="Search feature coming soon..." /></div>
                    </label>
                </div>
            </form>
        </div>
    )
}
