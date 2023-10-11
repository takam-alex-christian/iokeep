

import React from 'react'

import { useContext} from 'react'

import { appUiContext } from '@/libs/contexts'

import theme from '@/libs/theme'

export default function PrimaryButton(props: {
    label?: string,
    disabled?: boolean,
    children?: React.ReactNode | React.ReactNode[]
}) {

  const {appUiState} = useContext(appUiContext)

  const themeData = {colors: appUiState.uiMode == "dark" ? theme.colors.dark : theme.colors.light}

  return (
    <button type={"submit"} className={`w-full h-14 py-4 overflow-hidden px-8 rounded-2xl  bg-${themeData.colors.primary} text-${themeData.colors.onPrimary}`}>
        {props.label}
        {props.children}
    </button>
  )
}
