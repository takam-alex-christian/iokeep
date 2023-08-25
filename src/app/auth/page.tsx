"use client"


import React, { useState } from "react"

import PrimaryButton from "@/components/PrimaryButton"
import InputField from "@/components/InputField"
import Heading from "@/components/Heading"
import LinkButton from "@/components/LinkButton"

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


function SignInForm(props: { authPageState: AuthPageStateType, setAuthPageState: React.Dispatch<React.SetStateAction<AuthPageStateType>>}) {

    const [formState, setFormState] = useState({
        usernameValue: ""
    })

    return (
        <div className="flex flex-col gap-4 max-w-sm w-full">

            <Heading label="Sign in to Iokeep" />

            <form className="flex flex-col gap-4">

                <InputField attr={{ placeholder: "Username" }} />


                <InputField attr={{ placeholder: "Pa***ord" }} />


                <PrimaryButton label={"Sign In"} />

            </form>

            <div>
                <p className="flex flex-row gap-4 items-center justify-center text-center">
                    <span>Don't have and account ?</span><LinkButton label="SignUp" onClick={() => {props.setAuthPageState((prevState)=>{return {...prevState,  activeForm: "sign_up"}})}} />
                </p>
            </div>
        </div>
    )
}

function SignUpForm(props: { authPageState: AuthPageStateType, setAuthPageState: React.Dispatch<React.SetStateAction<AuthPageStateType>>}) {
    return (
        <div className="flex flex-col gap-4 max-w-sm w-full">

            <Heading label="Sign Up to Iokeep" />

            <form className="flex flex-col gap-4">

                <InputField attr={{ placeholder: "Username" }} />

                <InputField attr={{ placeholder: "Create passwprd" }} />

                <InputField attr={{ placeholder: "Confirm password" }} />

                {/* <InputField attr={{ placeholder: "Pa***ord" }} /> */}


                <PrimaryButton label={"Sign Up"} />

            </form>

            <div>
                <p className="flex flex-row gap-4 items-center justify-center text-center"><span>Already have an account ?</span><LinkButton label="SignIn" onClick={() => {props.setAuthPageState((prevState)=>{return {...prevState, activeForm: "sign_in"}})}} /></p>
            </div>
        </div>
    )
}