
import {cookies} from "next/headers"



export default function Home() {
  const allCookies = cookies().getAll();
  
  console.log(allCookies);

  return (
    <div>
      new feature comming soon <br />
      you now have to authenticate before login in
    </div>
  )
}