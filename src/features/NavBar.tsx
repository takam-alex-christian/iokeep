
import { useRouter } from "next/navigation"

import { useEffect, useContext, useReducer, useState, useRef } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

import SearchBar from "@/components/searchBar"
import IconButton from "@/components/iconButton"
import IokeepIcon from "@/components/IokeepIcon"

import {Moon as DarkThemeIcon, Profile as ProfileIcon, Icon } from "iconsax-react"

import { appUiContext } from "@/libs/contexts"
import { signOut } from "@/libs/auth"


export default function NavBar() {

    const { push } = useRouter()
    const { appUiState, appUiDispatch } = useContext(appUiContext);

    function uiModeChangeHandler() {
        appUiDispatch({ type: "switched_ui_mode" })
    }

    function loggoutButtonHandler() {

        signOut().then((signoutResponse) => {
            console.log(signoutResponse);
            push("/")

        })


    }

    return (
        <nav className={` grid grid-cols-nav-lg w-full items-center gap-4 py-4 px-16 h-fit shadow-md ${appUiState.uiMode == "light" ? "bg-stone-50" : "bg-stone-900"}`}>
            <div className="flex flex-row gap-2 items-center">
                <IokeepIcon />
                <div className="flex justify-center items-center w-6 h-6 bg-green-300 text-green-700 text-sm font-semibold rounded-full">v1</div>
            </div>

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