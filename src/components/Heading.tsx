

import React, {useContext} from 'react'

import { appUiContext } from '@/libs/contexts'

export default function Heading(props: {
    label: string,
}) {

  const {appUiState} = useContext(appUiContext);

  return (
    <h3 className={"p-4 text-lg font-bold " + `${appUiState.uiMode == "light" ? "text-zinc-700" : "text-zinc-500"}` }>{props.label}</h3>
  )
}
