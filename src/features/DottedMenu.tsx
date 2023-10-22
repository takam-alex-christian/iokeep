"use client"
//react imports
import React, { useState, useReducer, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Col from "@/layouts/Col";
import Row from "@/layouts/Row";
// lives in a div
// this div has a button and a display box for a button list

type DottedMenuOption = {
    label: string,
    icon: React.ReactElement,
    clickHandler: React.MouseEventHandler<HTMLButtonElement>
}

type DottedMenuProps = {

    options: DottedMenuOption[],
    className?: string
}

type DottedMenuStateType = {
    showOptions: boolean
}
type DottedActionType = { type: "show_options" } | { type: "hide_options" } | { type: "toggle_options" };

function dottedMenuReducer(prevState: DottedMenuStateType, action: DottedActionType): DottedMenuStateType {

    switch (action.type) {
        case "show_options": { return { ...prevState, showOptions: true } };
        case "hide_options": { return { ...prevState, showOptions: false } };
        case "toggle_options": { return { ...prevState, showOptions: prevState.showOptions ? false : true } }
        default: return prevState
    }
}

function DottedMenu(props: DottedMenuProps) {

    const [dottedMenuState, dottedMenuDispatch] = useReducer(dottedMenuReducer, { showOptions: false });

    function dottedIconClickHandler() {
        // will soon see an implementation
        dottedMenuDispatch({ type: "toggle_options" });
    }




    return (
        <div className={` ${props.className} z-50`}>
            <Col gap={0} className="">
                <Row className="justify-end">
                    <button onClick={dottedIconClickHandler}><FontAwesomeIcon icon={faEllipsis} /></button>
                </Row>
                <div className={""}>
                    {dottedMenuState.showOptions && <DottedMenuOptionList options={props.options} />}
                </div>
            </Col>
        </div>
    )
}

//menu options handled as a list
function DottedMenuOptionList(props: { options: DottedMenuOption[] }) {

    //some list specific here

    return (
        <ul>
            {/* options is a list */}
            <Col gap={0}>
                {props.options.map((eachDottedMenuOption, index) => {
                    return (<DottedMenuOption key={index} dottedMenuOptionData={eachDottedMenuOption} />)
                })}
            </Col>
        </ul>
    )
}

//each meanu option
function DottedMenuOption(props: { dottedMenuOptionData: DottedMenuOption }) {
    //some option specific operations here
    return (
        <li><Row className="justify-start"><button onClick={props.dottedMenuOptionData.clickHandler}><Row gap={3} className="items-center">{props.dottedMenuOptionData.icon}{props.dottedMenuOptionData.label}</Row></button></Row></li>
    )
}

export { DottedMenu }
export type { DottedMenuOption }
export default DottedMenu