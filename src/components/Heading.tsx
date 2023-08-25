import React from 'react'

export default function Heading(props: {
    label: string,
}) {
  return (
    <h3 className="p-4 text-lg font-bold text-neutral-700">{props.label}</h3>
  )
}
