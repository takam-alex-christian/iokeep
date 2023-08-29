
import {cookies} from "next/headers"
export default function Home() {

  console.log(cookies().getAll())
  return (
    <div>
      new feature comming soon <br />
      you now have to authenticate before login in
    </div>
  )
}