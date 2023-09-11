
import { cookies } from "next/headers"

import IokeepIcon from "@/components/IokeepLogo"

import PrimaryButton from "@/components/PrimaryButton"
import Link from "next/link"


export default function Home() {
  //test code
  const _authToken = cookies().get("_authToken")

  return (
    <main className="relative flex flex-col justify-between gap-6 px-8 md:px-16 min-h-screen">
      <nav 
      className=" px-8 md:px-16  flex flex-row justify-between items-center h-16">
        <div className="flex flex-row gap-2 items-center">
          <IokeepIcon />
          <div className="flex justify-center items-center w-6 h-6 bg-green-300 text-green-700 text-sm font-semibold rounded-full">v1</div>
        </div>

        <div className="flex flex-row gap-4">
          <div>
            <Link href={{pathname: "/auth", query: {selectedForm: "sign_up"}}}>
              <button className="bg-neutral-100 text-neutral-600 py-2 px-3 rounded-2xl">Sign Up</button>
            </Link>
          </div>
          <div>
            <Link href={{pathname: "/auth", query: {selectedForm: "sign_in"}}}>
              <button className="bg-green-600 text-neutral-100 py-2 px-3 rounded-2xl" >Sign in</button>
            </Link>
          </div>

        </div>
      </nav>

      <header className="">
        <div className="h-full flex flex-col items-center justify-center"> {/*hero section container*/}
          <div className="flex flex-col gap-6 justify-center items-center text-center">
            <h1 className="w-4/5 text-3xl md:text-5xl font-black text-neutral-900">Personalize your Note taking experience with Iokeep</h1>
            {/* Iokeep personalizing the note taking experience. */}
            <h3 className="w-3/5 text-base md:text-xl font-semibold text-neutral-700">Create and manage notes by collection, across devices.<br /> Try it out. It&apos;s free and will always be</h3>
            <div>
              <Link href={{pathname:"auth", query: {selectedForm: "sign_up"}}}>
                <button className="bg-green-600 py-3 px-6 text-lg font-medium text-neutral-100 rounded-2xl">Start Taking Notes</button>
              </Link>
            </div>

          </div>

        </div>

      </header>
      <footer className="flex flex-row justify-end px-8 md:px-16">
        <small className="py-2">Designed and Built with 💖 by Takam Alex C.</small>
      </footer>
    </main>
  )
}
