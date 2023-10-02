
import { useRouter } from "next/navigation"

import { useEffect, useContext, useReducer, useState, useRef } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

import SearchBar from "@/components/searchBar"
import IconButton from "@/components/iconButton"
import IokeepLogo from "@/components/IokeepLogo"

import {Moon as DarkThemeIcon, Profile as ProfileIcon, Icon } from "iconsax-react"

import { appUiContext } from "@/libs/contexts"
import { signOut } from "@/libs/auth"


export default function NavBar() {

    const { push } = useRouter()
    const { appUiState, appUiDispatch } = useContext(appUiContext);

    function uiModeChangeHandler() {
        appUiDispatch({ type: "switched_ui_mode" });
        
    }

    function loggoutButtonHandler() {

        signOut().then((signoutResponse) => {
            console.log(signoutResponse);
            push("/")

        })


    }

    return (
        <nav className={` grid grid-cols-nav-lg w-full items-center gap-4 py-4 px-2 sm:px-4 lg:px-8 xl:px-16 h-fit shadow-md ${appUiState.uiMode == "light" ? "bg-stone-50" : "bg-zinc-800"}`}>
            <div className="flex flex-row gap-2 items-center">
                <IokeepLogo />
                <div className="flex justify-center items-center py-1 px-2 bg-green-200 text-green-700 text-sm font-semibold rounded-full">v1.00</div>
            </div>

            <SearchBar />

            <div className="flex flex-row justify-end gap-4">

                <IconButton onClick={uiModeChangeHandler}><DarkThemeIcon size={24} color={`${appUiState.uiMode == "light"? "#474E41" : "#959E99"}`} /></IconButton>

                <IconButton onClick={loggoutButtonHandler}><FontAwesomeIcon icon={faArrowRightFromBracket} /></IconButton>

            </div>
        </nav>
    )
}