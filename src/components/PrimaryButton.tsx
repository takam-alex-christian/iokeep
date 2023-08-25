

import React from 'react'

export default function PrimaryButton(props: {
    label: String
}) {
  return (
    <button type={"submit"} className="w-full bg-green-600 text-neutral-100 py-4 px-8 rounded-2xl">
        {props.label}
    </button>
  )
}
