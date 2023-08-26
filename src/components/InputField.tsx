

import React from 'react'

export default function InputField(props: {

    placeholder?: string,
    className?: string,
    value?: string,
    onChangeHandler?: React.ChangeEventHandler
}

) {
    return (
        <div className='outline outline-1 outline-neutral-300 rounded-2xl focus-within:outline focus-within:outline-1 focus-within:outline-blue-300 '>
            <input type={"text"} value={props.value} onChange={props.onChangeHandler} placeholder={props.placeholder} className={"w-full p-4 text-base font-semibold focus:outline-none" + " " + props.className} />
        </div>
    )
}
