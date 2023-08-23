import React, { useContext } from 'react'

import Note from '@/components/note'

import { appDataContext } from '@/libs/contexts'

import { Hashtag as HashtagIcon } from "iconsax-react"
import { NoteDataType } from '@/libs/Types'

export default function NotesView() {

  const { appDataState } = useContext(appDataContext)

  return (
    <div className=' col-start-2 col-end-4 relative flex flex-col gap-4 '>

      <div className=' flex flex-row justify-between items-center'>
        <h2 className='text-3xl font-semibold p-4'>{appDataState.currentCollection}</h2>
      </div>


      {appDataState.collections.map((eachCollection) => {
        if(eachCollection.name == appDataState.currentCollection) return <NoteLister key={eachCollection.name} collectionNotes={eachCollection.notes ? eachCollection.notes : []} />
      })}


    </div>
  )
}


function NoteLister(props: { collectionNotes: NoteDataType[] }) {
  return (
    <div className='grid grid-cols-3 gap-2'>
      {props.collectionNotes.map((eachNote, index) => {
        return (<Note key={index} noteData={eachNote} />)
      })}
    </div>
  )
}