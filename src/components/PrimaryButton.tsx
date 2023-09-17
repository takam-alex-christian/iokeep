

import React from 'react'

export default function PrimaryButton(props: {
    label?: string,
    disabled?: boolean,
    children?: React.ReactNode | React.ReactNode[]
}) {

  return (
    <button type={"submit"} disabled={props.disabled}  className={`w-full h-14 py-4 overflow-hidden px-8 rounded-2xl ${props.disabled? "bg-neutral-600 text-neutral-300" : "bg-green-600 text-neutral-100 "}`}>
        {props.label}
        {props.children}
    </button>
  )
}
