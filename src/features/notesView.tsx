import React, { useContext, useEffect } from 'react'

import Note from '@/components/note'

import { appDataContext } from '@/libs/contexts'

import { Hashtag as HashtagIcon } from "iconsax-react"

import { NoteDataType } from '@/libs/Types'
import { useCollections } from '@/libs/getDataFromBackend'

export default function NotesView() {

  const { appDataState } = useContext(appDataContext)

  useEffect(()=>{
    console.log("note view")
    console.log(appDataState)
  }, [appDataState])

  return (
    <div className=' col-start-2 col-end-4 relative flex flex-col gap-4 '>

      <div className=' flex flex-row justify-between items-center'>
        <CurrentCollectionName />
      </div>

      {appDataState.collections.map((eachCollection) => {
        if (eachCollection.collectionName == appDataState.currentCollection.collectionName) return <NoteLister key={eachCollection.collectionName} collectionNotes={eachCollection.notes ? eachCollection.notes : []} />
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

function CurrentCollectionName() {

  const { collectionsData, isLoading: isCollectionsDataLoading } = useCollections()
  const {appDataState} = useContext(appDataContext)

  if (isCollectionsDataLoading) return (<div>Loading Collection name...</div>)
  else return (
    <h2 className='text-3xl font-semibold p-4'>{appDataState.currentCollection.collectionName}</h2>
  )

}