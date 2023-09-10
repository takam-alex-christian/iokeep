
import {useContext} from "react"
import {appUiContext} from "@/libs/contexts"

export default function IconButton(props: {children: React.ReactNode,onFocus?: ()=> void ,onBlur?: ()=> void , onClick?: (e: React.MouseEvent) => void}){
    
    const {appUiState} = useContext(appUiContext);
    
    return (
        <button onFocus={props.onFocus} onBlur={props.onBlur} onClick={props.onClick} className={"flex justify-center items-center w-10 h-10   rounded-2xl " + `${appUiState.uiMode == "light"? "text-dark bg-stone-100" : "bg-zinc-700 text-zinc-300"}`}>
            {props.children}
        </button>
    )
}