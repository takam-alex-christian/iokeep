
"use client"
import ErrorComponent from "@/components/ErrorComponent"
import Col from "@/layouts/Col"
import Row from "@/layouts/Row"
//prograde

import React, { HTMLInputTypeAttribute, useEffect, useState, useReducer } from "react"




//sign in form
export default function SignInPage() {


    const [formState, setFormState] = useState<{
        username: {
            value: string,
        },
        password: {
            value: string,
        }
    }>({
        username: {
            value: ""
        },
        password: {
            value: ""
        }
    })


    return (
        <div className="flex flex-col gap-4 max-w-sm w-full">

            <SignInForm />

        </div>
    )
}


type SignInFormStateType = {
    usernameValue: string,
    passwordValue: string,
}

type SignInFormReducerAction = {type: "update_username", payload: {value: string}} | {type: "update_password", payload: {value: string}}

function SignInForm() {


    const [formState, formDispatch] = useReducer<React.Reducer<SignInFormStateType, SignInFormReducerAction>>((prevState: SignInFormStateType, action:SignInFormReducerAction)=>{
        switch(action.type){
            case "update_username": return {...prevState, usernameValue: action.payload.value};
            case "update_password": return {...prevState, passwordValue: action.payload.value};
            default: return prevState
        }

    }, {usernameValue: "", passwordValue: ""})

    //test code//
    useEffect(()=>{
        console.log(formState)
    }, [formState])
    //end of test code //

    return (
        <form>
            <UsernameField formDispatch={formDispatch}  />
        </form>
    )
}

function UsernameField({formDispatch}: {formDispatch:React.Dispatch<SignInFormReducerAction>}) {

    const [usernameState, setUsernameState] = useState<{ value: string, showError: boolean, error: string }>({
        value: "",

        showError: false,
        error: ""
    });

    ////test code
    useEffect(() => {
        console.log(usernameState)
    }, [usernameState])
    ///end of test code ///

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        let { isValid, error } = validate(e.target.value)

        setUsernameState((prevState) => {
            return { ...prevState, value: e.target.value, showError: !isValid, error: error! }
        })

    }

    function validate(providedValue?: string): { isValid: boolean, error: string | null } {

        let value: string = ""

        if (typeof (providedValue) !== "undefined") value = providedValue
        else value = usernameState.value

        if (value.length !== 0) {
            return { isValid: true, error: null }
        } else return { isValid: false, error: "Username can not be empty!" }
    }

    function blurHandler(e: React.SyntheticEvent<HTMLInputElement>) {

        e.preventDefault();

        let {isValid} = validate()

        if (isValid) formDispatch({type: "update_username", payload: {value: usernameState.value}})
    }

    return (
        <Col>
            <Row>
                <input
                    type="text"
                    name="username"
                    value={usernameState.value}


                    onChange={changeHandler}
                    onBlur={blurHandler}
                    autoComplete="username"

                />
                <div></div> {/* icon */}
            </Row>
            {
                usernameState.showError && <ErrorComponent label={usernameState.error} />
            }
        </Col>
    )
}