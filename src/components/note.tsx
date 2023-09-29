"use client"

import { NoteDataType } from '@/libs/Types'
import React, { useState, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPencil} from '@fortawesome/free-solid-svg-icons'

import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'


import { appUiContext } from '@/libs/contexts'

type NoteProps = {
    noteData: NoteDataType
}

export default function Note(props: NoteProps) {

    //
    const { appUiState } = useContext(appUiContext)

    const [dottedMenuVisibility, setDottedMenuVisibility] = useState(false)

    const daysOfTheWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    const monthsOfTheYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const noteDate = new Date(props.noteData.lastModified)
    const DateString = `${daysOfTheWeek[noteDate.getDay()]}, ${monthsOfTheYear[noteDate.getMonth()]} ${noteDate.getDate()}, ${noteDate.getFullYear()}`


    function mouseEnterHandler() {
        setDottedMenuVisibility(true);
    }

    function mouseLeaveHandler() {
        setDottedMenuVisibility(false)
    }

    return (
        <article
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className={' relative rounded-2xl ' + `${appUiState.uiMode == 'light' ? "bg-zinc-100" : "bg-zinc-800"}`}>

            {dottedMenuVisibility && <DottedMenu />}

            <div className='flex flex-col p-5 gap-3 justify-between h-full'>{/* Note container*/}
                <div className='flex flex-col gap-3 overflow-hidden text-ellipsis'>
                    <h3 className={'font-medium text-lg  overflow-hidden text-ellipsis ' + `${appUiState.uiMode == "light" ? "text-stone-600" : "text-zinc-500"}`}>{props.noteData.title}</h3>
                    <p className={'font-normal text-base  overflow-hidden text-ellipsis ' + `${appUiState.uiMode == "light" ? "text-stone-400" : "text-zinc-600"}`}>{props.noteData.body}</p>
                </div>

                {/* note footer */}
                <div className={""} role='footer'>
                    <small className={'font-normal text-sm text-gray ' + `${appUiState.uiMode == "light" ? "text-stone-400" : "text-zinc-600"}`}>{DateString}</small>
                </div>
            </div>
        </article>
    )
}

function DottedMenu() {

    const { appUiState } = useContext(appUiContext)

    const [isContentRevealed, setRevealContent] = useState(false);


    const MenuButton = (props: { children: React.ReactNode | React.ReactNode[], clickHandler: React.MouseEventHandler<HTMLButtonElement> }): React.ReactElement => (
        <button type="button" onClick={props.clickHandler}><div className='flex flex-row gap-2 items-center text-base'>{props.children}</div></button>
    )


    function revealMenuContent(){
        setRevealContent(true);
    }

    return (
        <div className={`absolute top-2 right-2 rounded-full w-8 h-8 ` + `${appUiState.uiMode == "light" ? "text-stone-600" : "text-zinc-500"}`} >
            <button className='flex justify-center items-center w-full h-full rounded-full' onClick={revealMenuContent}>
                <FontAwesomeIcon icon={faEllipsis} />
            </button>

            {isContentRevealed &&
                <div className='absolute right-2 bg- min-w-fit flex flex-col justify-end '>
                    <MenuButton clickHandler={() => { }} ><FontAwesomeIcon icon={faPencil} /><span>Edit</span></MenuButton>
                    <MenuButton clickHandler={() => { }} ><FontAwesomeIcon icon={faTrashCan} /><span>Delete</span></MenuButton>
                </div>
            }
        </div>
    )
}

// function DottedMenuContent(){


//     return (
//     <div>

//     </div>)
// }