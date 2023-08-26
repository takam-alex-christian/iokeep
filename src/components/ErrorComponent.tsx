

import React from 'react'

export default function ErrorComponent(props: {label: string}) {
  return (
    <div className='text-red-600 bg-red-300 border-red-500 rounded-2xl border px-4 py-2'>{props.label}</div>
  )
}
