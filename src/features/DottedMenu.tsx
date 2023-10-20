"use client"
//react imports
import React, {useState, useReducer, useContext} from "react";

import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import type {Icon as FaIconType} from "@fortawesome/fontawesome-svg-core"

import Col from "@/layouts/Col";
// lives in a div
// this div has a button and a display box for a button list

type DottedMenuOption = {
    label: string,
    icon: FaIconType,
    clickHandler: React.MouseEventHandler<HTMLButtonElement>
}

type DottedMenuProps = {

    options: DottedMenuOption[]
}

type DottedMenuStateType = {
    showOptions: boolean
}
type DottedActionType = {type: "show_options"} | {type: "hide_options"} ; 

function dottedMenuReducer(prevState: DottedMenuStateType, action: DottedActionType): DottedMenuStateType{
   
    switch(action.type){
        case "show_options": {return {...prevState, showOptions: true}};
        case "hide_options": {return {...prevState, showOptions: false}};
        default: return prevState
    }
}

function DottedMenu(props: DottedMenuProps) {

    const [dottedMenuState, dottedMenuDispatch]= useReducer(dottedMenuReducer, {showOptions: false});

    function dottedIconClickHandler(){
        // will soon see an implementation
    }


    return (
        <div>
            <div>
                <button onClick={dottedIconClickHandler}><FontAwesomeIcon icon={faEllipsis} /></button>
            </div>
            <div>
                {dottedMenuState.showOptions && <DottedMenuOptionList options= {} />}
            </div>
        </div>
    )
}

function DottedMenuOptionList(props: {options: DottedMenuOption}){

    return (
        <Col >
        </Col>
    )
}

function DottedMenuOption(){

}