
import { useContext } from "react"
import Image from "next/image"

import { appUiContext } from "@/libs/contexts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ModalOverlay(props: { children: React.ReactNode[] | React.ReactNode, externalCloseHandler?: Function }) {

    const { appUiDispatch } = useContext(appUiContext)

    function closeButtonHandler() {
        //if an external handler is defined, use it
        if (typeof (props.externalCloseHandler) !== "undefined") {
            appUiDispatch({ type: "hide_modal" })
        } else {//else use the default handler
            props.externalCloseHandler!()
        }
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-50">
            <div className="absolute top-4 right-4"><button onClick={closeButtonHandler} className="text-neutral-100 text-2xl"><FontAwesomeIcon icon={faXmark} /> </button></div>
            {props.children}
        </div>
    )
}