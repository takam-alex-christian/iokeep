
import React from 'react'

export default function LinkButton(props: {
    label: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}){
    return (
        <button onClick={props.onClick} className="font-semibold text-green-600">{props.label}</button>
    )
}