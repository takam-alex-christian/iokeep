"use client"

import { NoteDataType } from '@/libs/Types'
import React, { useState } from 'react'


type NoteProps = {
    noteData: NoteDataType
}

export default function Note(props: NoteProps) {

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
        <article className=' rounded-2xl bg-light-gray'>
            
            <div className='flex flex-col p-5 gap-3'>{/* Note container*/}
                <h3 className='font-medium text-lg text-dark'>{props.noteData.title}</h3>

                <p className='font-light text-base text-gray'>{props.noteData.body}</p>

                <small className='font-light text-sm text-gray'>{DateString}</small>
            </div>
            
        </article>
    )
}
