

import React from 'react'

export default function PrimaryButton(props: {
    label: string,
    disabled?: boolean
}) {

  return (
    <button type={"submit"} disabled={props.disabled}  className={`w-full py-4 px-8 rounded-2xl ${props.disabled? "bg-neutral-600 text-neutral-300" : "bg-green-600 text-neutral-100 "}`}>
        {props.label}
    </button>
  )
}
