"use client"

import { useReducer } from "react"

//contexts
import { appUiContext, appDataContext } from "@/libs/contexts" //ui for ui related state and data for data related state

//reducers
import { appUiReducer, appDataReducer } from "@/libs/reducers"

//types
import { AppUiStateType, AppDataStateType, AppUiActionType, AppDataActionType } from "@/libs/Types"

import NavBar from '@/features/NavBar'
import NotesView from '@/features/notesView'

import CollectionNav from '@/features/CollectionNav'
import AddNote from '@/features/AddNote'
import ModalOverlay from "@/components/modaOverlay"
import CreateCollection from "@/features/CreateCollection"
// List pane
// Display pane



export default function Home() {

  const [appUiState, appUiDispatch] = useReducer<React.Reducer<AppUiStateType, AppUiActionType>>(appUiReducer, { uiMode: "light", modalOverlay: false });

  const [appDataState, appDataDispatch] = useReducer<React.Reducer<AppDataStateType, AppDataActionType>>(appDataReducer, { collections: ["fake01", "fake02", "fake03", "fake04"], currentCollection: "", notes: [] });

  return (
    <appUiContext.Provider value={{ appUiState, appUiDispatch }}>

      <main className='flex flex-col gap-8'>
        <NavBar />
        <div className='grid grid-cols-lg gap-4 px-16'>
          <appDataContext.Provider value={{ appDataState, appDataDispatch }} >
            <CollectionNav />
            <NotesView />
          </appDataContext.Provider>
          {/* <AddNote /> */}

        </div>

        {appUiState.modalOverlay &&
          <ModalOverlay>
            {appUiState.currentModalView == "create_collection" && <CreateCollection />}
            {appUiState.currentModalView == "add_note" && <AddNote />}
          </ModalOverlay>
        }

      </main>
    </appUiContext.Provider>
  )
}
