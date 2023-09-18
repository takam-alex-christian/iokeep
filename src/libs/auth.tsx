

//Signin utils



//signup utils
async function isUsernameAvailable(username: string){

    let response = fetch("/auth/check_username/?username=" + username, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    return (await response).json()
}


async function signUp(props: {
    username: string,
    password: string
}){
    let response = fetch("/backend/auth/signup", 
    {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({...props})
    })

    return (await response).json()
}

async function signIn(props: {
    username: string,
    password: string
}){
    let response = fetch("/backend/auth/signin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...props})
    })

    return (await response).json()
}

async function signOut(){
    let response = fetch ("/auth/signout", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        }
    })

    return (await response).json()
}

export {isUsernameAvailable, signUp, signIn, signOut}