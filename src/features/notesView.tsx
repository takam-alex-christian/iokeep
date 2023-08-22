import React from 'react'

import Note from '@/components/note'
import AddNote from './AddNote'

import { Hashtag as HashtagIcon } from "iconsax-react"

export default function NotesView() {
  return (
    <div className=' col-start-2 col-end-4 relative flex flex-col gap-4 '>

      <div className=' flex flex-row justify-between items-center'>
        <h2 className='text-3xl font-semibold p-4'>Notes</h2>
      </div>

      <div className='grid grid-cols-3 gap-2'>
        <Note key={0} noteData={{ title: "Sample Note 1", body: "the main content of the note itself is displaced here", lastModified: "1 day ago" }} />
        <Note key={1} noteData={{ title: "Sample Note 2", body: "the main content of the note itself is displaced here", lastModified: "1 day ago" }} />
        <Note key={2} noteData={{ title: "Sample Note 2", body: "the main content of the note itself is displaced here", lastModified: "1 day ago" }} />
        <Note key={3} noteData={{ title: "Sample Note 1", body: "the main content of the note itself is displaced here", lastModified: "1 day ago" }} />
        <Note key={4} noteData={{ title: "Sample Note 2", body: "the main content of the note itself is displaced here", lastModified: "1 day ago" }} />
        <Note key={5} noteData={{ title: "Sample Note 2", body: "the main content of the note itself is displaced here", lastModified: "1 day ago" }} />
      </div>

    </div>
  )
}
