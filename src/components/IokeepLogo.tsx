

import React, {useContext} from "react"

import { Notepad2} from "iconsax-react"

import { appUiContext } from "@/libs/contexts"


export default function IokeepLogo() {

    const {appUiState} = useContext(appUiContext)

    return (
        <div className="flex flex-row gap-2 text-neutral-800"><Notepad2 color={`${appUiState.uiMode == "light"? "#474E41" : "#959E99"}`}/><h3 className={`text-lg font-semibold ${appUiState.uiMode == "light"? "text-zinc-800" : "text-zinc-200"}`}>Iokeep</h3></div>
    )
}