
import {cookies} from "next/headers"

export default function Home() {
//test code
  const _authToken = cookies().get("_authToken")
  
  return (
    <div>
      new feature comming soon {_authToken?.value} <br />
      you now have to authenticate before login in
    </div>
  )
}