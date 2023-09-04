import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    console.log("form the middleware")
    console.log(request.cookies.getAll())  

    let allCookies = request.cookies.getAll();
    let hasValidAuthToken: boolean = false

    allCookies.forEach((eachCookie)=>{
      if(eachCookie.name == "_authToken"){
        // console.log(eachCookie)

        //it's place and time to validate the _authToken with the backend
        //check it's validity or prehaps, change it.
        if(eachCookie.value.length == 24){
            hasValidAuthToken = true
        }
        


      }
    })

    if(hasValidAuthToken == false) return NextResponse.redirect(new URL("/auth", request.url))
    else return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app:path*',
}