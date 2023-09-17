
"use client"

import Heading from "@/components/Heading"
import ErrorComponent from "@/components/ErrorComponent"
import PrimaryButton from "@/components/PrimaryButton"
import Col from "@/layouts/Col"
import Row from "@/layouts/Row"
//prograde

import React, { HTMLInputTypeAttribute, useEffect, useState, useReducer } from "react"
import Link from "next/link"

//loaders
import BeatLoader from "react-spinners/BeatLoader";




//sign in form
export default function SignInPage() {

    return (
        <main className="min-h-screen flex justify-center items-center">

            <SignInForm />

        </main>
    )
}


type SignInFormStateType = {
    usernameValue: string,
    passwordValue: string,
    isLoading: boolean
}

type SignInFormReducerAction = { type: "update_username", payload: { value: string } } | { type: "update_password", payload: { value: string } } | {type: "start_loading"} | {type: "stop_loading"}

function SignInForm() {


    const [formState, formDispatch] = useReducer<React.Reducer<SignInFormStateType, SignInFormReducerAction>>((prevState: SignInFormStateType, action: SignInFormReducerAction) => {
        switch (action.type) {
            case "update_username": return { ...prevState, usernameValue: action.payload.value };
            case "update_password": return { ...prevState, passwordValue: action.payload.value };

            case "start_loading": return {...prevState, isLoading: true};
            case "stop_loading": return {...prevState, isLoading: false};

            default: return prevState
        }

    }, { usernameValue: "", passwordValue: "", isLoading: false })

    //test code//
    useEffect(() => {
        console.log(formState)
    }, [formState])
    //end of test code //

    function formSubmitHandler(e: React.FormEvent){
        e.preventDefault();

        formDispatch({type: "start_loading"});

        //post login data to server

        //on response, update the formstate
        
    }
    return (
        <div className="max-w-md w-full">
            <form className="" method="post" onSubmit={formSubmitHandler}>
                <Col>
                    <Heading label="IOKEEP | Sign In" />
                    <Col gap={6}>
                        <AuthField purpose="username" formState={formState} formDispatch={formDispatch} />
                        <AuthField purpose="password" formState={formState} formDispatch={formDispatch} />
                        <PrimaryButton>
                            {formState.isLoading && <BeatLoader cssOverride={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                color="#ffffffa0"
                                size={12}
                            />}
                            {
                                formState.isLoading == false && <span>Sign In</span>
                            }
                            
                        </PrimaryButton>

                        <div className="flex flex-row gap-4 items-center justify-center text-center">
                            <span>Don&apos;t have and account ?</span><Link href="/auth/signup" className="font-semibold text-green-600">Sign Up</Link>
                        </div>
                    </Col>
                </Col>

            </form>
        </div>
    )
}

function AuthField(props: { formState: SignInFormStateType,formDispatch: React.Dispatch<SignInFormReducerAction>, purpose: "password" | "username" }) {

    let label: string | string[] = props.purpose.split("");
    label.splice(0, 1, label[0].toUpperCase());
    label = label.join("");

    const [authFieldState, setAuthState] = useState<{ value: string, showError: boolean, error: string }>({
        value: "",

        showError: false,
        error: ""
    });

    ////test code
    useEffect(() => {
        console.log(authFieldState)
    }, [authFieldState])
    ///end of test code ///

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        let { isValid, error } = validate(e.target.value)

        setAuthState((prevState) => {
            return { ...prevState, value: e.target.value, showError: !isValid, error: error! }
        })

    }

    function validate(providedValue?: string): { isValid: boolean, error: string | null } {

        let value: string = ""

        if (typeof (providedValue) !== "undefined") value = providedValue
        else value = authFieldState.value

        if (value.length !== 0) {
            return { isValid: true, error: null }
        } else return { isValid: false, error: `${props.purpose}` + " can not be empty!" }
    }

    function blurHandler(e: React.SyntheticEvent<HTMLInputElement>) {

        e.preventDefault();

        let { isValid } = validate()

        if (isValid) props.formDispatch({ type: `update_${props.purpose}`, payload: { value: authFieldState.value } })
    }

    return (
        <Col gap={2}>

            <Row className={`overflow-hidden outline outline-1 outline-neutral-300 rounded-2xl focus-within:outline focus-within:outline-1 focus-within:outline-green-300`}>
                <input
                    id={props.purpose}
                    type={props.purpose == "username" ? "text" : props.purpose}
                    name={props.purpose}
                    value={authFieldState.value}
                    placeholder={props.purpose}
                    aria-placeholder={props.purpose}

                    disabled={props.formState.isLoading}

                    onChange={changeHandler}
                    onBlur={blurHandler}
                    autoComplete={props.purpose == "password" ? "current-password" : "username"}

                    title={label}

                    className={`w-full p-4 text-base font-semibold focus:outline-none`}
                />
                <div></div> {/* icon */}
            </Row>
            {
                authFieldState.showError && <ErrorComponent label={authFieldState.error} />
            }
        </Col>
    )
}
