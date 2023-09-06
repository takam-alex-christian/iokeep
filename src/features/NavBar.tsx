
import { useRouter } from "next/navigation"

import { useEffect, useContext, useReducer, useState, useRef } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons"

import SearchBar from "@/components/searchBar"
import IconButton from "@/components/iconButton"

import { Notepad2 as IokeepIcon, Moon as DarkThemeIcon, Profile as ProfileIcon, Icon } from "iconsax-react"

import { appUiContext } from "@/libs/contexts"
import { signOut } from "@/libs/auth"


export default function NavBar() {

    const {push} = useRouter()
    const { appUiState, appUiDispatch } = useContext(appUiContext);

    function uiModeChangeHandler() {
        appUiDispatch({ type: "switched_ui_mode" })
    }

    function loggoutButtonHandler(){

        signOut().then((signoutResponse)=>{
            console.log(signoutResponse);
            push("/")
            
        })

        
    }

    return (
        <nav className={` grid grid-cols-nav-lg w-full items-center gap-4 py-4 px-16 h-fit shadow-md ${appUiState.uiMode == "light" ? "bg-stone-50" : "bg-stone-900"}`}>
            <div className="flex flex-row gap-4 pl-4"><IokeepIcon color="#000" /><h3 className="text-lg font-semibold">Iokeep</h3></div>

            <SearchBar />

            <div className="flex flex-row justify-end    gap-4">
                {/* change theme */}
                {/* <button><DarkThemeIcon color="#000" size={24} /></button> */}

                {/* <button><ProfileIcon color="#000" size={24} /></button> */}

                <IconButton onClick={uiModeChangeHandler}><DarkThemeIcon size={24} /></IconButton>

                <IconButton onClick={loggoutButtonHandler}><FontAwesomeIcon icon={faArrowRightFromBracket} /></IconButton>

            </div>
        </nav>
    )
}