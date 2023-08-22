"use client"

import { useReducer } from "react"

//contexts
import { appUiContext, appDataContext } from "@/libs/contexts" //ui for ui related state and data for data related state

//reducers
import { appUiReducer } from "@/libs/reducers"

//types
import { AppUiStateType, AppUiActionType } from "@/libs/Types"

import NavBar from '@/features/NavBar'
import NotesView from '@/features/notesView'

import CollectionNav from '@/features/CollectionNav'
import AddNote from '@/features/AddNote'
// List pane
// Display pane



export default function Home() {

  const [appUiState, appUiDispatch] = useReducer<React.Reducer<AppUiStateType, AppUiActionType>>(appUiReducer, {uiMode: "light"} );


  return (
    <appUiContext.Provider value={{appUiState, appUiDispatch}}>
      <main className='flex flex-col gap-8'>
        <NavBar />
        <div className='grid grid-cols-lg gap-4 px-16'>
          <CollectionNav />
          <NotesView />
          {/* <AddNote /> */}

        </div>
      </main>
    </appUiContext.Provider>
  )
}
