import React, { useContext, useEffect } from 'react'

import Note from '@/components/note'

import { appDataContext, appUiContext } from '@/libs/contexts'

import { Hashtag as HashtagIcon, Additem as AdditemIcon } from "iconsax-react"

import { NoteDataType } from '@/libs/Types'
import { useCollections, useNotes } from '@/libs/getDataFromBackend'
import Heading from '@/components/Heading'
import BlockLoadingPlaceholder from '@/components/BlockLoadingPlaceholder'
import Col from '@/layouts/Col'

import { daysOfTheWeek, monthsOfTheYear } from '@/data/dates'


type DateObject = {
  day: number, //0 - 6
  date: number, //1-31
  month: number, //0-11
  year: number, //any four digits number 
}

type NotesGroupedByDate = {
  date: DateObject,
  notes: NoteDataType[]
}


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
        if (appDataState.currentCollection.collectionName.length !== 0) {
          appDataDispatch({ type: "switch_current_collection", payload: { collectionName: "", _collectionId: "" } })
        }
      }
    }
  }, [collectionsData, appDataDispatch, appDataState, isCollectionsDataLoading])

  return (
    <div className=' min-h-[calc(100vh-132px)] relative flex flex-col gap-4 '>

      {isCollectionsDataLoading == false &&
        <>
          {collectionsData && collectionsData.collections.length > 0 &&
            <>
              {/* <div className=' flex flex-row justify-between items-center'>
                <CurrentCollectionName />
              </div> */}


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

  const { appUiDispatch, appUiState } = useContext(appUiContext)

  return (
    <div className={'text-center h-full  flex flex-col items-center justify-center gap-2 rounded-3xl ' + `${appUiState.uiMode == "light" ? "bg-zinc-50" : "bg-zinc-800"}`}>
      <Heading label='Oh! You Have No COllection.' />

      <div className={'flex flex-col gap-4 justify-center items-center '}>
        <p className={`${appUiState.uiMode == "light" ? "text-zinc-600" : "text-zinc-500"}`}>A collection is a folder for collectible notes.<br /> They allow you to organise notes in a relatable fashion 😎</p>
        <button
          onClick={() => { appUiDispatch({ type: "show_modal", payload: { view: "create_collection" } }) }}
          className="w-fit bg-stone-100 rounded-2xl">
          <div className="flex flex-row gap-4 p-4">
            <AdditemIcon size={24} color="#000" />
            <span>Create Your First collection Now!</span>
          </div>

        </button>
      </div>
    </div>
  )
}

function CreateANoteViewIfEmpty() {
  const { appUiDispatch, appUiState } = useContext(appUiContext)

  return (
    <div className={'text-center h-full  flex flex-col items-center justify-center gap-2 rounded-3xl ' + `${appUiState.uiMode == "light" ? "bg-zinc-50" : "bg-zinc-800"}`}>
      <Heading label='This Collection is Empty' />

      <div className='flex flex-col gap-4 justify-center items-center'>
        <p className={`${appUiState.uiMode == "light" ? "text-zinc-600" : "text-zinc-500"}`} >You have no collectible notes in this collection. <br />Why don&apos;t you start by adding one 😉.</p>
        <button
          onClick={() => { appUiDispatch({ type: "show_modal", payload: { view: "add_note" } }) }}
          className="w-fit bg-stone-100 rounded-2xl">
          <div className="flex flex-row gap-4 p-4">
            <AdditemIcon size={24} color="#000" />
            <span>Add a note to this collection</span>
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
  else {

    const groupedNotesData: NotesGroupedByDate[] = []

    notesData?.notes.forEach((eachNote) => {

      let lastModifiedDate = new Date(eachNote.lastModified);
      let lastModifiedDateObject = { day: lastModifiedDate.getDay(), date: lastModifiedDate.getDate(), month: lastModifiedDate.getMonth(), year: lastModifiedDate.getFullYear() }

      if (groupedNotesData.length == 0) { //first iteration, no groups expected
        groupedNotesData.push({ date: lastModifiedDateObject, notes: [eachNote] })
      } else if (groupedNotesData.length > 0) {
        //
        let prevGroupDateObject = groupedNotesData.slice(-1)[0].date

        if (prevGroupDateObject.date == lastModifiedDateObject.date && prevGroupDateObject.month == lastModifiedDateObject.month && prevGroupDateObject.year == lastModifiedDateObject.year) {
          //this note and the previous have the same date object

          //then we add this new note to the last group
          groupedNotesData[groupedNotesData.length - 1].notes.push(eachNote)

        } else {
          // we create a new group for this note since it has a different date object
          groupedNotesData.push({ date: lastModifiedDateObject, notes: [eachNote] })
        }

      }
    })

    console.log(groupedNotesData)

    return (
      <>
        {/* {notesData && notesData?.notes.length > 0 && <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
          {notesData?.notes.map((eachNote, index) => {
            return (<Note key={index} noteData={eachNote} />)
          })}
        </div>} */}

        {
          <Col gap={2}>
            {groupedNotesData.map((eachGroup, index) => {
              return (<NotesGrid key={index} groupData={eachGroup} />)
            })}
          </Col>
        }

        {
          notesData?.notes.length == 0 && <CreateANoteViewIfEmpty />
        }
      </>
    )
  }
}


function NotesGrid(props: {groupData: NotesGroupedByDate}) {
  return (
    <Col gap={1}>
      <Heading label={`${daysOfTheWeek[props.groupData.date.day]} ${monthsOfTheYear[props.groupData.date.month]} ${props.groupData.date.date} ${props.groupData.date.year}`} />
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
        {props.groupData.notes.map((eachNote) => {
          return (<Note key={eachNote._id} noteData={eachNote} />)
        })}
      </div>
    </Col>
  )
}
