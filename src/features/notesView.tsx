import React, { useContext, useEffect } from 'react'

import Note from '@/components/note'

import { appDataContext, appUiContext } from '@/libs/contexts'

import { Hashtag as HashtagIcon, Additem as AdditemIcon } from "iconsax-react"

import { NoteDataType } from '@/libs/Types'
import { useCollections, useNotes } from '@/libs/getDataFromBackend'
import Heading from '@/components/Heading'
import BlockLoadingPlaceholder from '@/components/BlockLoadingPlaceholder'

export default function NotesView() {

  const { appDataState, appDataDispatch } = useContext(appDataContext)

  const { isLoading: isCollectionsDataLoading, collectionsData } = useCollections();
  const { isNotesLoading, notesData } = useNotes();

  useEffect(() => {
    console.log("note view")
    console.log(appDataState)
  }, [appDataState])

  useEffect(() => {
    if (isCollectionsDataLoading == false) {
      if (appDataState.currentCollection.collectionName.length == 0 && collectionsData && collectionsData.collections.length > 0) {
        appDataDispatch({ type: "switch_current_collection", payload: { collectionName: collectionsData?.collections[0].collectionName, _collectionId: collectionsData?.collections[0]._collectionId } })
      }

      if (collectionsData?.collections.length == 0) {
        appDataDispatch({ type: "switch_current_collection", payload: { collectionName: "", _collectionId: "" } })
      }
    }
  }, [collectionsData])

  return (
    <div className=' h-[calc(100vh-132px)] relative flex flex-col gap-4 '>

      {isCollectionsDataLoading == false &&
        <>
          {collectionsData && collectionsData.collections.length > 0 &&
            <>
              <div className=' flex flex-row justify-between items-center'>
                <CurrentCollectionName />
              </div>


              <NoteLister />



            </>}

          {collectionsData?.collections.length == 0 && <CreateACollectionViewIfEmpty />}

        </>
      }

      {isCollectionsDataLoading == true &&
        <BlockLoadingPlaceholder />
      }

    </div>
  )
}

//if no collection is forund, prompt the user to create a collection
function CreateACollectionViewIfEmpty() {

  const { appUiDispatch } = useContext(appUiContext)

  return (
    <div className='text-center flex flex-col gap-2'>
      <Heading label='Start by creating a collection.' />

      <div className='flex flex-col gap-4 items-center justify-center'>
        <p>It's a place where you can store and organise your notes <br /> as collectibles.</p>
        <button
          onClick={() => { appUiDispatch({ type: "show_modal", payload: { view: "create_collection" } }) }}
          className="w-fit bg-stone-100 rounded-2xl">
          <div className="flex flex-row gap-4 p-4">
            <AdditemIcon size={24} color="#000" />
            <span>New collection</span>
          </div>

        </button>
      </div>
    </div>
  )
}

function CreateANoteViewIfEmpty() {
  const { appUiDispatch } = useContext(appUiContext)

  return (
    <div className='text-center h-full bg-neutral-50 flex flex-col items-center justify-center gap-2 rounded-3xl '>
      <Heading label='This Collection is Empty' />

      <div className='flex flex-col gap-4 justify-center items-center'>
        <p>Add collectible notes.</p>
        <button
          onClick={() => { appUiDispatch({ type: "show_modal", payload: { view: "add_note" } }) }}
          className="w-fit bg-stone-100 rounded-2xl">
          <div className="flex flex-row gap-4 p-4">
            <AdditemIcon size={24} color="#000" />
            <span>Add Note</span>
          </div>

        </button>
      </div>
    </div>
  )
}


function NoteLister() {

  const { appDataState } = useContext(appDataContext);

  const { isLoading: isCollectionsDataLoading } = useCollections();
  const { notesData, isNotesLoading } = useNotes() //we pass the currentCollection Id instead

  useEffect(() => {
    console.log("within the noteLister")
    console.log(appDataState.currentCollection);
  })

  if (isNotesLoading) return (<BlockLoadingPlaceholder />)
  else return (
    <>
      {notesData && notesData?.notes.length > 0 && <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
        {notesData?.notes.map((eachNote, index) => {
          return (<Note key={index} noteData={eachNote} />)
        })}
      </div>}

      {
        notesData?.notes.length == 0 && <CreateANoteViewIfEmpty />
      }
    </>
  )
}

function CurrentCollectionName() {

  const { collectionsData, isLoading: isCollectionsDataLoading } = useCollections()
  const { appDataState } = useContext(appDataContext)

  if (isCollectionsDataLoading) return (<BlockLoadingPlaceholder />)
  else return (
    <h2 className='text-3xl font-semibold p-4'>{appDataState.currentCollection.collectionName}</h2>
  )

}