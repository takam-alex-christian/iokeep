"use client"

import { useReducer, useEffect, useState } from "react"

//contexts
import { appUiContext, appDataContext } from "@/libs/contexts" //ui for ui related state and data for data related state

//reducers
import { appUiReducer, appDataReducer } from "@/libs/reducers"

//types
import { AppUiStateType, AppDataStateType, AppUiActionType, AppDataActionType, CollectionDataType, NoteDataType } from "@/libs/Types"

//components
import ModalOverlay from "@/components/modaOverlay"

//features
import NavBar from '@/features/NavBar'
import NotesView from '@/features/notesView'

import CollectionNav from '@/features/CollectionNav'
import AddNote from '@/features/AddNote'
import CreateCollection from "@/features/CreateCollection"

import { getUserData, useUser, useCollections } from "@/libs/getDataFromBackend"

// List pane
// Display pane

//libs

//thirdparty


export default function App() {

  //just sample data
  const firstCollectionNotes: NoteDataType[] = [
    { title: "the world", body: " so much text", creationDate: "", lastModified: "", id: "0", tags: [] },
    { title: "the world", body: " so much text", creationDate: "", lastModified: "", id: "0", tags: [] },
    { title: "the world", body: " so much text", creationDate: "", lastModified: "", id: "0", tags: [] },
    { title: "the world", body: " so much text", creationDate: "", lastModified: "", id: "0", tags: [] }
  ]

  const secondCollectionNotes: NoteDataType[] = [
    { title: "Shanghai is cool", body: " so much text", creationDate: "", lastModified: "", id: "0", tags: [] },
    { title: "Shanghai is cool", body: " so much text", creationDate: "", lastModified: "", id: "0", tags: [] },
    { title: "Shanghai is cool", body: " so much text", creationDate: "", lastModified: "", id: "0", tags: [] },
  ]

  const fetchedCollections: CollectionDataType[] = [{ collectionName: "collection01", _collectionId: "", notes: [...firstCollectionNotes] }, { collectionName: "another02",_collectionId: "", notes: [...secondCollectionNotes] }]

  const [appUiState, appUiDispatch] = useReducer<React.Reducer<AppUiStateType, AppUiActionType>>(appUiReducer, { uiMode: "light", modalOverlay: false });

  const [appDataState, appDataDispatch] = useReducer<React.Reducer<AppDataStateType, AppDataActionType>>(appDataReducer, { collections: fetchedCollections, currentCollection: {collectionName: "", _collectionId: ""} });




  return (
    <appUiContext.Provider value={{ appUiState, appUiDispatch }}>
      <appDataContext.Provider value={{ appDataState, appDataDispatch }} >
        <main className='flex flex-col gap-8'>
          <NavBar />
          <div className='grid grid-cols-lg gap-4 px-16'>

            <CollectionNav />
            <NotesView />

            {/* <AddNote /> */}

          </div>

          {appUiState.modalOverlay &&
            <ModalOverlay>
              {appUiState.currentModalView == "create_collection" && <CreateCollection />}
              {appUiState.currentModalView == "add_note" && <AddNote />}
            </ModalOverlay>
          }

        </main>
      </appDataContext.Provider>
    </appUiContext.Provider>
  )
}

