import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    console.log("form the middleware")
    console.log(request.cookies.getAll())  

    let allCookies = request.cookies.getAll();
    let hasAuthToken: boolean = false

    allCookies.forEach((eachCookie)=>{
      if(eachCookie.name == "_authToken"){
        // console.log(eachCookie)
        console.log(request.url)
        hasAuthToken = true
      }
    })

    if(hasAuthToken == false) return NextResponse.redirect(new URL("/auth", request.url))
    else return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app:path*',
}