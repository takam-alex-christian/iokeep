"use client"

import React from 'react'

import { useContext } from 'react'

import { appUiContext } from '@/libs/contexts'

import theme from '@/libs/theme'
import { BeatLoader } from 'react-spinners'

export default function PrimaryButton(props: {
  isLoading?: boolean,
  label?: string,
  disabled?: boolean,
  children?: React.ReactNode | React.ReactNode[],
}) {


  const { appUiState } = useContext(appUiContext)

  const themeData = { colors: appUiState.uiMode == "dark" ? theme.colors.dark : theme.colors.light }

  return (
    <button
      type={"submit"}
      className={`w-full h-14 py-4 overflow-hidden px-8 rounded-2xl ${themeData.colors.primary} ${themeData.colors.onPrimary}`}>

      {typeof (props.isLoading) !== "undefined" && props.isLoading == true && <BeatLoader cssOverride={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        color="#ffffffa0"
        size={8}
      />}
      {typeof (props.label) !== "undefined" && props.label}
      {typeof (props.children) !== "undefined" && props.isLoading !== true && props.children}
    </button>
  )
}
