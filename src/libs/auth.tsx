

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
    let response = fetch("/auth/signup", 
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
    let response = fetch("/auth/signin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...props})
    })

    return (await response).json()
}

export {isUsernameAvailable, signUp, signIn}