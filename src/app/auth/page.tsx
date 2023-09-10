"use client"


import React, { useEffect, useState } from "react"

//next
import { redirect, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

//components
import PrimaryButton from "@/components/PrimaryButton"
import InputField from "@/components/InputField"
import Heading from "@/components/Heading"
import LinkButton from "@/components/LinkButton"



//lib
import { isUsernameAvailable, signIn, signUp } from "@/libs/auth"
import ErrorComponent from "@/components/ErrorComponent"

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

interface AuthPageStateType {

    activeForm: "sign_in" | "sign_up",
    authenticated: boolean
}



export default function Auth() {
    const searchParams = useSearchParams()
    
    const [authPageState, setAuthPageState] = useState<AuthPageStateType>(
        {
            activeForm: searchParams.get("selectedForm") !== null? searchParams.get("selectedForm") as "sign_in" | "sign_up": "sign_in",
            authenticated: false
        }
    )

    useEffect(() => {
        if (authPageState.authenticated == true) redirect("/app");
    }, [authPageState.authenticated])

    return (
        <main className="w-screen h-screen px-4">
            <div className=" flex justify-center items-center w-full h-full">
                {authPageState.activeForm == "sign_in" && <SignInForm authPageState={authPageState} setAuthPageState={setAuthPageState} />} {/*the signin form is displayed*/}
                {authPageState.activeForm == "sign_up" && <SignUpForm authPageState={authPageState} setAuthPageState={setAuthPageState} />}
            </div>
        </main>
    )
}


//sign in form
function SignInForm(props: { authPageState: AuthPageStateType, setAuthPageState: React.Dispatch<React.SetStateAction<AuthPageStateType>> }) {


    const [formState, setFormState] = useState({
        usernameValue: "",
        passwordValue: ""
    })

    const [formValidationState, setFormValidationState] = useState({
        username: {
            isValid: false as boolean,
            errors: [] as string[]
        },
        password: {
            isValid: false as boolean,
            errors: [] as string[]
        }
    })

    useEffect(() => {
        console.log(formState)
    }, [formState])

    function usernameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        let isValid: boolean = false;
        let errors: string[] = []

        if (e.target.value.length == 0) {
            errors.push("Username can not be empty")
        } else {
            if (e.target.value.length >= validationRulesObject.username.minLength && e.target.value.length <= validationRulesObject.username.maxLength) {
                isValid = true
            } else {
                errors.push(`Username should be between ${validationRulesObject.username.minLength} and ${validationRulesObject.username.maxLength} characters long`)
            }
        }

        //we update validationstate
        setFormValidationState((prevState) => {
            return { ...prevState, username: { errors, isValid } }
        })

        //we update formstate
        setFormState((prevState) => {
            return { ...prevState, usernameValue: e.target.value }
        })
    }

    function passwordChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        let isValid: boolean = false;
        let errors: string[] = []

        if (e.target.value.length == 0) {
            errors.push("Password can not be empty")
        } else {
            isValid = true
        }

        //we update validationstate
        setFormValidationState((prevState) => {
            return { ...prevState, password: { errors, isValid } }
        })

        setFormState((prevState) => {
            return { ...prevState, passwordValue: e.target.value }
        })
    }

    async function signinFormSubmitHandler(e: React.FormEvent) {
        e.preventDefault();

        if (formValidationState.username.isValid && formValidationState.password.isValid) {
            //login request
            await signIn({ username: formState.usernameValue, password: formState.passwordValue }).then((jsonResponse) => {

                //if we succeed we redirect to app
                if (jsonResponse.succeeded == true) {

                    console.log("signin successful. what next ?")

                    props.setAuthPageState((prevState) => {
                        return { ...prevState, authenticated: true }
                    });
                }

            })
        }

    }
    return (
        <div className="flex flex-col gap-4 max-w-sm w-full">

            <Heading label="Sign in to Iokeep" />

            <form onSubmit={signinFormSubmitHandler} className="flex flex-col gap-4">

                <InputField placeholder={"Username"} onChangeHandler={usernameChangeHandler} />

                {formValidationState.username.isValid == false && formValidationState.username.errors.length > 0 &&
                    formValidationState.username.errors.map((eachError, index) => {
                        return <ErrorComponent key={index} label={eachError} />
                    })
                }

                <InputField type="password" placeholder={"Pa***ord"} onChangeHandler={passwordChangeHandler} />

                {formValidationState.password.isValid == false && formValidationState.password.errors.length > 0 &&
                    formValidationState.password.errors.map((eachError, index) => {
                        return <ErrorComponent key={index} label={eachError} />
                    })
                }

                <PrimaryButton
                    label={"Sign In"} />

            </form>

            <div>
                <p className="flex flex-row gap-4 items-center justify-center text-center">
                    <span>Don't have and account ?</span><LinkButton label="SignUp" onClick={() => { props.setAuthPageState((prevState) => { return { ...prevState, activeForm: "sign_up" } }) }} />
                </p>
            </div>
        </div>
    )
}


//signup form

function SignUpForm(props: { authPageState: AuthPageStateType, setAuthPageState: React.Dispatch<React.SetStateAction<AuthPageStateType>> }) {
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

    useEffect(() => {
        console.log(formValidationState)
    }, [formValidationState])

    async function usernameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        // we validate username according to validationRulesObject
        //username validation
        let errorArray: string[] = []
        let isValid: boolean = false

        if (e.target.value.length >= validationRulesObject.username.minLength && e.target.value.length <= validationRulesObject.username.maxLength) {

            await isUsernameAvailable(e.target.value).then((jsonResponse) => {
                console.log(jsonResponse)
                if (jsonResponse.available == true) {
                    isValid = true
                } else {
                    errorArray.push("username " + e.target.value + " is not available for use. pick another one")
                }
            })

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
        let isValid: boolean = false


        if (formState.createPasswordValue == e.target.value) {
            isValid = true;
        } else {
            errorArray.push("Both passowrds must be exactly the same")

        }


        setFormValidationState((prevState) => {
            return { ...prevState, confirmPassword: { errors: errorArray, isValid } }
        })

        setFormState((prevState) => {
            return { ...prevState, confirmPasswordValue: e.target.value }
        })
    }

    async function formSubmitHandler(e: React.FormEvent) {
        e.preventDefault();

        if (formValidationState.username.isValid && formValidationState.password.isValid && formValidationState.confirmPassword.isValid) {
            await signUp({
                username: formState.usernameValue,
                password: formState.confirmPasswordValue
            }).then((response) => {

                console.log(response)
                //we use local storage to store the auth token

                //we updated the page's authenticated state
                props.setAuthPageState((prevState) => {
                    return { ...prevState, authenticated: true }
                })

                //on subsequent launches, we can just check wether _authToken exist in local memory

            })

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
                    !formValidationState.username.isValid && formValidationState.username.errors.map((error, index) => {
                        return <ErrorComponent key={index} label={error} />
                    })
                }

                <InputField type="password" placeholder={"Create passwprd"} onChangeHandler={createPasswordChangeHandler} />
                {
                    !formValidationState.password.isValid && formValidationState.password.errors.map((error, index) => {
                        return <ErrorComponent key={index} label={error} />
                    })
                }

                <InputField type="password" placeholder={"Confirm password"} onChangeHandler={confirmPasswordChangeHandler} />
                {
                    !formValidationState.confirmPassword.isValid && formValidationState.confirmPassword.errors.map((error, index) => {
                        return <ErrorComponent key={index} label={error} />
                    })
                }

                <PrimaryButton 
                // disabled={!(formValidationState.username.isValid && formValidationState.password.isValid && formValidationState.confirmPassword.isValid)}
                label={"Sign Up"} />

            </form>

            <div>
                <p className="flex flex-row gap-4 items-center justify-center text-center"><span>Already have an account ?</span><LinkButton label="SignIn" onClick={() => { props.setAuthPageState((prevState) => { return { ...prevState, activeForm: "sign_in" } }) }} /></p>
            </div>
        </div>
    )
}