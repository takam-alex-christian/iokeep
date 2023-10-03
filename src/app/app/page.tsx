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
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import AddButtonGroup from "@/components/AddButtonGroup"
import FloatingPlusButton from "@/features/FloatingPlusButton"
import { InitAppUiState } from "@/libs/initAppUi"
config.autoAddCss = false

//themes
import themeData from "@/libs/theme"

export default function App() {



  const [appUiState, appUiDispatch] = useReducer<React.Reducer<AppUiStateType, AppUiActionType>>(appUiReducer, { uiMode: "dark", modalOverlay: false });

  const [appDataState, appDataDispatch] = useReducer<React.Reducer<AppDataStateType, AppDataActionType>>(appDataReducer, { currentCollection: { collectionName: "", _collectionId: "" } });

  const theme = {colors: appUiState.uiMode == "dark"? themeData.colors.dark : themeData.colors.light }

  return (
    <appUiContext.Provider value={{ appUiState, appUiDispatch }}>
      <appDataContext.Provider value={{ appDataState, appDataDispatch }} >

        
        <InitAppUiState />


        <main className={'min-h-screen flex flex-col gap-8 ' + `bg-${theme.colors.background}"}`}>
          <FloatingPlusButton />

          <NavBar />
          <div className='grid grid-cols-1 sm:grid-cols-main-lg  gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-8 xl:px-16'>

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
