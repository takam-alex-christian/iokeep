
import React, { useReducer } from "react"

import Link from "next/link"

import PrimaryButton from "@/components/PrimaryButton"
import Heading from "@/components/Heading"
import ErrorComponent from "@/components/ErrorComponent"

import Row from "@/layouts/Row"
import Col from "@/layouts/Col"

//third party
import { BeatLoader } from "react-spinners"

export default function SignUp() {
    return (
        <main>
            <h1>Coming soon...</h1>
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

    const [formState, formDispatch] = useReducer<React.Reducer<SignUpFormStateType, SignUpFormActionType>>((prevState: SignUpFormStateType, action: SignUpFormActionType) => {
        switch (action.type) {
            case "update_new_username": return { ...prevState, newUsernameValue: action.payload.value }
            case "update_new_password": return { ...prevState, newPasswordValue: action.payload.value }
            case "update_confirm_password": return { ...prevState, confirmPasswordValue: action.payload.value }

            case "start_loading": return { ...prevState, isLoading: true }
            case "stop_loading": return { ...prevState, isLoading: false }

            case "update_error": return { ...prevState, error: action.payload.value }

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

    function formSubmitHandler(e: React.FormEvent) {

    }

    return (
        <div className="max-w-md w-full">
            <form className="" method="post" onSubmit={formSubmitHandler}>
                <Col>
                    <Heading label="IOKEEP | Sign Up" />
                    <Col gap={4}>
                        <Col gap={2}>
                            <NewUsernameField formState={formState} formDispatch={formDispatch} />
                            <NewPasswordField formState={formState} formDispatch={formDispatch} />
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
                            <span>Don&apos;t have and account ?</span><Link href="/auth/signup" className="font-semibold text-green-600">Sign Up</Link>
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

function NewPasswordField(props: {confirm?: boolean, formState: SignUpFormStateType, formDispatch: React.Dispatch<SignUpFormActionType> }) {

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()

        props.formDispatch({ type: `${typeof(props.confirm ) !== "undefined" && props.confirm == false? "update_new_password": "update_confirm_password"}`, payload: { value: e.target.value } })

    }

    return (
        <Col gap={2}>

            <Row className={`overflow-hidden outline outline-1 outline-neutral-300 rounded-2xl focus-within:outline focus-within:outline-1 focus-within:outline-green-300`}>
                <input
                    type={"password"}
                    name={`${typeof(props.confirm) !== "undefined" && props.confirm == true? "confirm_password" :"new_password"} `}
                    value={props.formState.confirmPasswordValue}
                    placeholder={`${typeof(props.confirm) !== "undefined" && props.confirm == true? "Confirm Password" :"Choose a Password"}`}
                    aria-placeholder={`${typeof(props.confirm) !== "undefined" && props.confirm == true? "type in your password agin" :"Please choose a password"}`}

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
