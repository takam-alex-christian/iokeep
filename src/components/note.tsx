"use client"

import { NoteDataType } from '@/libs/Types'
import React, { useState, useContext} from 'react'


import { appUiContext } from '@/libs/contexts'

type NoteProps = {
    noteData: NoteDataType
}

export default function Note(props: NoteProps) {

    //
    const {appUiState} = useContext(appUiContext)

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

    return (
        <article className={' rounded-2xl ' + `${appUiState.uiMode== 'light' ? "bg-zinc-100" : "bg-zinc-800"}`}>

            <div className='flex flex-col p-5 gap-3 justify-between h-full'>{/* Note container*/}
                <div className='flex flex-col gap-3 overflow-hidden text-ellipsis'>
                    <h3 className={'font-medium text-lg  overflow-hidden text-ellipsis ' +`${ appUiState.uiMode == "light"? "text-stone-600": "text-zinc-500"}`}>{props.noteData.title}</h3>
                    <p className={'font-normal text-base  overflow-hidden text-ellipsis ' + `${appUiState.uiMode == "light"? "text-stone-400": "text-zinc-600"}`}>{props.noteData.body}</p>
                </div>

                {/* note footer */}
                <div className={""} role='footer'>
                    <small className={'font-normal text-sm text-gray ' +  `${appUiState.uiMode == "light"? "text-stone-400": "text-zinc-600"}`}>{DateString}</small>
                </div>
            </div>

        </article>
    )
}
