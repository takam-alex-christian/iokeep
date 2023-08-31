

import { useContext, useReducer, useState } from "react"

import SearchBar from "@/components/searchBar"
import IconButton from "@/components/iconButton"

import { Notepad2 as IokeepIcon, Moon as DarkThemeIcon, Profile as ProfileIcon, Icon } from "iconsax-react"

import { appUiContext } from "@/libs/contexts"

//

type NavBarStateType = {
    showProfileOptions: boolean,

}

type NavBarActionType = { type: "show_profile" } | {type: "hide_proile"}

function navBarReducer(prevState: NavBarStateType, action: NavBarActionType): NavBarStateType{
    switch (action.type) {
        case "show_profile": {
            return { ...prevState, showProfileOptions: true }
        }
        case "hide_proile":{
            return {...prevState, showProfileOptions: false}
        }
        default: {
            console.log("wrong action type attempted")
            return { ...prevState }
        }
    }
}


export default function NavBar() {

    const { appUiState, appUiDispatch } = useContext(appUiContext);

    const [navBarState, navBarDispatch] = useReducer(navBarReducer, { showProfileOptions: false })

    function uiModeChangeHandler() {
        appUiDispatch({ type: "switched_ui_mode" })
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
                <div className="">
                    <IconButton onBlur={()=>{navBarDispatch({type: "hide_proile"})}} onClick={() => { navBarDispatch({ type: "show_profile" }) }} ><ProfileIcon size={24} /></IconButton>
                    <div className="relative">
                        {
                            navBarState.showProfileOptions && <div className="absolute z-50 right-0 top-0 p-2">
                                <ul>
                                    <button onClick={()=>{console.log("loggout clicked")}}>
                                        loggout
                                    </button>
                                    <button>
                                        sdf
                                    </button>
                                </ul>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </nav>
    )
}
