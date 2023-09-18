"use client"
import React, { useReducer } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import PrimaryButton from "@/components/PrimaryButton"
import Heading from "@/components/Heading"
import ErrorComponent from "@/components/ErrorComponent"

import Row from "@/layouts/Row"
import Col from "@/layouts/Col"

//libs
import { signUp } from "@/libs/auth"

//third party
import { BeatLoader } from "react-spinners"

export default function SignUpPage() {
    return (
        <main className="relative max-sm:py-6 md:min-h-screen flex justify-center items-center px-4">
            <SignUpForm />
        </main>

    )
}


type SignUpFormStateType = {
    newUsernameValue: string,
    newPasswordValue: string,
    confirmPasswordValue: string,

    error: string,
    showError: boolean,
    isLoading: boolean
}

type SignUpFormActionType =
    { type: "update_new_username", payload: { value: string } } |
    { type: "update_new_password", payload: { value: string } } |
    { type: "update_confirm_password", payload: { value: string } } |

    { type: "start_loading" } |
    { type: "stop_loading" } |

    { type: "update_error", payload: { value: string } } |

    { type: "show_error" } |
    { type: "hide_error" }



function SignUpForm() {

    const router = useRouter();

    const [formState, formDispatch] = useReducer<React.Reducer<SignUpFormStateType, SignUpFormActionType>>((prevState: SignUpFormStateType, action: SignUpFormActionType) => {
        switch (action.type) {
            case "update_new_username": return { ...prevState, newUsernameValue: action.payload.value }
            case "update_new_password": return { ...prevState, newPasswordValue: action.payload.value }
            case "update_confirm_password": return { ...prevState, confirmPasswordValue: action.payload.value }

            case "start_loading": return { ...prevState, isLoading: true }
            case "stop_loading": return { ...prevState, isLoading: false }

            case "update_error": return { ...prevState, error: action.payload.value, showError: true, isLoading: false }

            case "show_error": return { ...prevState, showError: true }
            case "hide_error": return { ...prevState, showError: false }
            default: return prevState
        }
    }, {
        newUsernameValue: "",
        newPasswordValue: "",
        confirmPasswordValue: "",

        error: "",
        showError: false,
        isLoading: false
    });

    async function formSubmitHandler(e: React.FormEvent) {
        e.preventDefault();

        formDispatch({ type: "start_loading" });

        //we validate the form input here

        if (formState.newUsernameValue.length > 0) {
            if (formState.newPasswordValue.length > 0) {
                if (formState.confirmPasswordValue == formState.newPasswordValue) {

                    //we can pursue signing in the user

                    //post login data to server
                    console.log("life is good")
                    //on response, update the formstate

                    await signUp({ username: formState.newUsernameValue, password: formState.newPasswordValue }).then((jsonResponse) => {


                        //if we succeed we redirect to app
                        if (jsonResponse.succeeded == true) {

                            console.log("authed")

                            formDispatch({ type: "stop_loading" });

                            router.push("/app");

                        }

                    }).catch((err)=>{
                        formDispatch({ type: "stop_loading" });
                        formDispatch({type: "update_error", payload: {value: err}})
                    })

                }else formDispatch({type: "update_error", payload: {value: "Both password must be the same!"}})

            } else formDispatch({ type: "update_error", payload: { value: "Password can not be empty!" } })
        } else formDispatch({ type: "update_error", payload: { value: "Username should not be empty!" } })


    }

    return (
        <div className="max-w-md w-full">
            <form className="" method="post" onSubmit={formSubmitHandler}>
                <Col>
                    <Heading label="IOKEEP | Sign Up" />
                    <Col gap={4}>
                        <Col gap={2}>
                            <NewUsernameField formState={formState} formDispatch={formDispatch} />
                            <NewPasswordField confirm={false} formState={formState} formDispatch={formDispatch} />
                            <NewPasswordField confirm={true} formState={formState} formDispatch={formDispatch} />
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
                            <span>Already have an account ?</span><Link href="/auth/signin" className="font-semibold text-green-600">Sign In instead</Link>
                        </div>
                    </Col>
                </Col>

            </form>
        </div>
    )
}

function NewUsernameField(props: { formState: SignUpFormStateType, formDispatch: React.Dispatch<SignUpFormActionType> }) {

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        props.formDispatch({ type: `update_new_username`, payload: { value: e.target.value } })

    }

    return (
        <Col gap={2}>

            <Row className={`overflow-hidden outline outline-1 outline-neutral-300 rounded-2xl focus-within:outline focus-within:outline-1 focus-within:outline-green-300`}>
                <input
                    type={"text"}
                    name={"username"}
                    value={props.formState.newUsernameValue}
                    placeholder={"@Username"}
                    aria-placeholder={"Enter your username"}

                    disabled={props.formState.isLoading}

                    onChange={changeHandler}

                    autoComplete={"off"}

                    title={"Enter your username!"}

                    className={`w-full p-4 text-base font-semibold focus:outline-none`}
                />
                <div></div> {/* icon */}
            </Row>
        </Col>
    )
}

function NewPasswordField(props: { confirm?: boolean, formState: SignUpFormStateType, formDispatch: React.Dispatch<SignUpFormActionType> }) {

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        props.formDispatch({ type: `${typeof (props.confirm) !== "undefined" && props.confirm == false ? "update_new_password" : "update_confirm_password"}`, payload: { value: e.target.value } })

    }

    return (
        <Col gap={2}>

            <Row className={`overflow-hidden outline outline-1 outline-neutral-300 rounded-2xl focus-within:outline focus-within:outline-1 focus-within:outline-green-300`}>
                <input
                    type={"password"}
                    name={`${typeof (props.confirm) !== "undefined" && props.confirm == true ? "confirm_password" : "new_password"} `}
                    value={typeof (props.confirm) !== "undefined" && props.confirm == true ? props.formState.confirmPasswordValue : props.formState.newPasswordValue}
                    placeholder={`${typeof (props.confirm) !== "undefined" && props.confirm == true ? "Confirm Password" : "Choose a Password"}`}
                    aria-placeholder={`${typeof (props.confirm) !== "undefined" && props.confirm == true ? "type in your password agin" : "Please choose a password"}`}

                    disabled={props.formState.isLoading}

                    onChange={changeHandler}

                    autoComplete={"new-password"}

                    className={`w-full p-4 text-base font-semibold focus:outline-none`}
                />
                <div></div> {/* icon */}
            </Row>
        </Col>
    )
}
