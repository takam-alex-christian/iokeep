
"use client"


import Heading from "@/components/Heading"
import ErrorComponent from "@/components/ErrorComponent"
import PrimaryButton from "@/components/PrimaryButton"
import Col from "@/layouts/Col"
import Row from "@/layouts/Row"
//prograde

import React, { HTMLInputTypeAttribute, useEffect, useState, useReducer } from "react"
import Link from "next/link"

import { useRouter } from "next/navigation"

//loaders
import BeatLoader from "react-spinners/BeatLoader";
import { signIn } from "@/libs/auth"




//sign in form
export default function SignInPage() {



    return (
        <main className="relative max-sm:py-6 md:min-h-screen flex justify-center items-center px-4">
            {/* error area */}
            <SignInForm />

        </main>
    )
}


type SignInFormStateType = {
    usernameValue: string,
    passwordValue: string,

    error: string,
    showError: boolean,

    isLoading: boolean
}

type SignInFormReducerAction = { type: "update_username", payload: { value: string } }
    | { type: "update_password", payload: { value: string } }
    | { type: "update_error", payload: { value: string } }
    | { type: "show_error" }
    | { type: "hide_error" }
    | { type: "start_loading" }
    | { type: "stop_loading" }

function SignInForm() {

    const router = useRouter()

    const [formState, formDispatch] = useReducer<React.Reducer<SignInFormStateType, SignInFormReducerAction>>((prevState: SignInFormStateType, action: SignInFormReducerAction) => {
        switch (action.type) {
            case "update_username": return { ...prevState, usernameValue: action.payload.value };
            case "update_password": return { ...prevState, passwordValue: action.payload.value };

            case "update_error": return { ...prevState, error: action.payload.value, showError: true };

            case "start_loading": return { ...prevState, isLoading: true };
            case "stop_loading": return { ...prevState, isLoading: false };

            case "show_error": return { ...prevState, showError: true };
            case "hide_error": return { ...prevState, showError: false };

            default: return prevState
        }

    }, { usernameValue: "", passwordValue: "", error: "", showError: false, isLoading: false })

    //test code//
    useEffect(() => {
        console.log(formState)
    }, [formState])
    //end of test code //

    async function formSubmitHandler(e: React.FormEvent) {
        e.preventDefault();

        formDispatch({ type: "start_loading" });

        //we validate the form input here

        if (formState.usernameValue.length > 0) {
            if (formState.passwordValue.length > 0) {
                //we can pursue signing in the user

                //post login data to server
                console.log("life is good")
                //on response, update the formstate

                await signIn({ username: formState.usernameValue, password: formState.passwordValue }).then((jsonResponse) => {
                    

                    //if we succeed we redirect to app
                    if (jsonResponse.succeeded == true) {

                        console.log("authed")

                        formDispatch({type: "stop_loading"});
                        
                        router.push("/app");

                    }

                })

            } else formDispatch({ type: "update_error", payload: { value: "Password can not be empty!" } })
        } else formDispatch({ type: "update_error", payload: { value: "Username should not be empty!" } })


    }


    return (
        <div className="max-w-md w-full">
            <form className="" method="post" onSubmit={formSubmitHandler}>
                <Col>
                    <Heading label="IOKEEP | Sign In" />
                    <Col gap={4}>
                        <Col gap={2}>
                            <UsernameField formState={formState} formDispatch={formDispatch} />
                            <PasswordField formState={formState} formDispatch={formDispatch} />
                            {/* error block */}
                            <div>
                                {formState.showError && <ErrorComponent label={formState.error} />}
                            </div>
                        </Col>

                        <PrimaryButton>
                            {formState.isLoading && <BeatLoader cssOverride={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                color="#ffffffa0"
                                size={8}
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


//password
function UsernameField(props: { formState: SignInFormStateType, formDispatch: React.Dispatch<SignInFormReducerAction> }) {

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        props.formDispatch({ type: `update_username`, payload: { value: e.target.value } })

    }

    return (
        <Col gap={2}>

            <Row className={`overflow-hidden outline outline-1 outline-neutral-300 rounded-2xl focus-within:outline focus-within:outline-1 focus-within:outline-green-300`}>
                <input
                    type={"text"}
                    name={"username"}
                    value={props.formState.usernameValue}
                    placeholder={"@Username"}
                    aria-placeholder={"Enter your username"}

                    disabled={props.formState.isLoading}

                    onChange={changeHandler}

                    autoComplete={"username"}

                    title={"Enter your username!"}

                    className={`w-full p-4 text-base font-semibold focus:outline-none`}
                />
                <div></div> {/* icon */}
            </Row>
        </Col>
    )
}

//password
function PasswordField(props: { formState: SignInFormStateType, formDispatch: React.Dispatch<SignInFormReducerAction> }) {

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        props.formDispatch({ type: `update_password`, payload: { value: e.target.value } })

    }

    return (
        <Col gap={2}>

            <Row className={`overflow-hidden outline outline-1 outline-neutral-300 rounded-2xl focus-within:outline focus-within:outline-1 focus-within:outline-green-300`}>
                <input
                    type={"password"}
                    name={"password"}
                    value={props.formState.passwordValue}
                    placeholder={"Password"}
                    aria-placeholder={"Enter your password!"}

                    disabled={props.formState.isLoading}

                    onChange={changeHandler}

                    autoComplete={"current-password"}

                    className={`w-full p-4 text-base font-semibold focus:outline-none`}
                />
                <div></div> {/* icon */}
            </Row>
        </Col>
    )
}
