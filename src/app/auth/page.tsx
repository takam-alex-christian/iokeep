"use client"


import React, { useEffect, useState } from "react"

import PrimaryButton from "@/components/PrimaryButton"
import InputField from "@/components/InputField"
import Heading from "@/components/Heading"
import LinkButton from "@/components/LinkButton"


//lib
import { isUsernameAvailable, createAccount } from "@/libs/auth"
import ErrorComponent from "@/components/ErrorComponent"

interface AuthPageStateType {

    activeForm: "sign_in" | "sign_up",

}

export default function Auth() {

    const [authPageState, setAuthPageState] = useState<AuthPageStateType>(
        { activeForm: "sign_in" }
    )



    return (
        <main className="w-screen h-screen">
            <div className=" flex justify-center items-center w-full h-full">
                {authPageState.activeForm == "sign_in" && <SignInForm authPageState={authPageState} setAuthPageState={setAuthPageState} />} {/*the signin form is displayed*/}
                {authPageState.activeForm == "sign_up" && <SignUpForm authPageState={authPageState} setAuthPageState={setAuthPageState} />}
            </div>
        </main>
    )
}


function SignInForm(props: { authPageState: AuthPageStateType, setAuthPageState: React.Dispatch<React.SetStateAction<AuthPageStateType>> }) {

    const [formState, setFormState] = useState({
        usernameValue: "",
        passwordValue: ""
    })

    useEffect(() => {
        console.log(formState)
    }, [formState])

    function usernameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState((prevState) => {
            return { ...prevState, usernameValue: e.target.value }
        })
    }

    function passwordChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState((prevState) => {
            return { ...prevState, passwordValue: e.target.value }
        })
    }

    return (
        <div className="flex flex-col gap-4 max-w-sm w-full">

            <Heading label="Sign in to Iokeep" />

            <form className="flex flex-col gap-4">

                <InputField placeholder={"Username"} onChangeHandler={usernameChangeHandler} />


                <InputField placeholder={"Pa***ord"} onChangeHandler={passwordChangeHandler} />


                <PrimaryButton label={"Sign In"} />

            </form>

            <div>
                <p className="flex flex-row gap-4 items-center justify-center text-center">
                    <span>Don't have and account ?</span><LinkButton label="SignUp" onClick={() => { props.setAuthPageState((prevState) => { return { ...prevState, activeForm: "sign_up" } }) }} />
                </p>
            </div>
        </div>
    )
}

function SignUpForm(props: { authPageState: AuthPageStateType, setAuthPageState: React.Dispatch<React.SetStateAction<AuthPageStateType>> }) {

    //validation rules
    const validationRulesObject = {
        //this object will allow for easy rule change later down the line. wh
        //will save me some time not having to look for these individual would be magic numbers to change them
        username: {
            minLength: 1,
            maxLength: 12,
            allowedRegexp: ""
        },
        password: {
            minLength: 8,
            maxLength: 24
        }
    }

    //formstate adapted to accomodate errorState for each individual form
    //both *HasError && *ErrorMessage are set on field validation
    //only *HasError are validated on formsubmition
    const [formState, setFormState] = useState({
        usernameValue: "",
        createPasswordValue: "",
        confirmPasswordValue: "",
    })

    const [formValidationState, setFormValidationState] = useState({
        username: {
            isValid: false as boolean,
            errors: [] as string[]
        },
        password: {
            isValid: false as boolean,
            errors: [] as string[]
        },
        confirmPassword: {
            isValid: false as boolean,
            errors: [] as string[]
        }
    })

    // useEffect(() => {

    //     console.log(formState)

    //     isUsernameAvailable(formState.usernameValue).then(result => {
    //         console.log(result)
    //     })

    // }, [formState.usernameValue])


    async function usernameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        // we validate username according to validationRulesObject
        //username validation
        let errorArray: string[] = []
        let isValid: boolean = false

        if (e.target.value.length >= validationRulesObject.username.minLength && e.target.value.length <= validationRulesObject.username.maxLength) {
            isValid = true
        } else {
            errorArray.push("length should be between " + validationRulesObject.username.minLength + " and " + validationRulesObject.username.maxLength + " characters")
        }

        setFormValidationState((prevState) => {
            return { ...prevState, username: { errors: errorArray, isValid: isValid } }
        })

        setFormState((prevState) => {
            return {
                ...prevState,
                usernameValue: e.target.value,
            }
        })
    }

    function createPasswordChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        //createpassword validation
        let errorArray: string[] = []
        let isValid: boolean = false

        if (e.target.value.length >= validationRulesObject.password.minLength && e.target.value.length <= validationRulesObject.password.maxLength) {
            isValid = true
        } else {
            errorArray.push("length should be between " + validationRulesObject.password.minLength + " and " + validationRulesObject.password.maxLength + " characters")
        }

        setFormValidationState((prevState) => {
            return { ...prevState, password: { errors: errorArray, isValid: isValid } }
        })


        setFormState((prevState) => {
            return { ...prevState, createPasswordValue: e.target.value }
        })
    }

    function confirmPasswordChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        let errorArray: string[] = []
        let isValid: boolean = true

        if (!formValidationState.password.isValid) {
            isValid = false;
            errorArray.push("Your initial password is invalid")
        }


        if (formState.createPasswordValue !== e.target.value) {
            isValid = false;
            errorArray.push("Both passowrds must be exactly the same")
        }


        setFormValidationState((prevState) => {
            return { ...prevState, confirmPassword: { errors: errorArray, isValid } }
        })
        
        setFormState((prevState) => {
            return { ...prevState, confirmPasswordValue: e.target.value }
        })
    }

    function formSubmitHandler(e: React.FormEvent) {
        e.preventDefault();

        if (formValidationState.username.isValid && formValidationState.password.isValid && formValidationState.confirmPassword.isValid) {
            createAccount({
                username: formState.usernameValue,
                password: formState.confirmPasswordValue
            }).then((response) => {
                console.log(response)
            })

            console.log("formSubmited")
        } else {
            console.log("form was not send because some fields are not yet validated")
        }


    }



    return (
        <div className="flex flex-col gap-4 max-w-sm w-full">

            <Heading label="Sign Up to Iokeep" />

            <form className="flex flex-col gap-4" onSubmit={formSubmitHandler}>

                <InputField placeholder={"Username"} onChangeHandler={usernameChangeHandler} />
                {
                    !formValidationState.username.isValid && formValidationState.username.errors.map((error) => {
                        return <ErrorComponent label={error} />
                    })
                }

                <InputField placeholder={"Create passwprd"} onChangeHandler={createPasswordChangeHandler} />
                {
                    !formValidationState.password.isValid && formValidationState.password.errors.map((error) => {
                        return <ErrorComponent label={error} />
                    })
                }

                <InputField placeholder={"Confirm password"} onChangeHandler={confirmPasswordChangeHandler} />
                {
                    !formValidationState.confirmPassword.isValid && formValidationState.confirmPassword.errors.map((error) => {
                        return <ErrorComponent label={error} />
                    })
                }

                <PrimaryButton label={"Sign Up"} />

            </form>

            <div>
                <p className="flex flex-row gap-4 items-center justify-center text-center"><span>Already have an account ?</span><LinkButton label="SignIn" onClick={() => { props.setAuthPageState((prevState) => { return { ...prevState, activeForm: "sign_in" } }) }} /></p>
            </div>
        </div>
    )
}