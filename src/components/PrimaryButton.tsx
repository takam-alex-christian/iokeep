

import React from 'react'

export default function PrimaryButton(props: {
    label?: string,
    disabled?: boolean,
    children?: React.ReactNode | React.ReactNode[]
}) {

  return (
    <button type={"submit"} disabled={props.disabled}  className={`w-full h-14 py-4 overflow-hidden px-8 rounded-2xl`}>
        {props.label}
        {props.children}
    </button>
  )
}
