

//Signin utils



//signup utils
async function isUsernameAvailable(username: string){

    let response = fetch("/auth/api/?q=check_username&username=" + username, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    return (await response).json()
}



async function createAccount(props: {
    username: string,
    password: string
}){

    let response = fetch("/user/api", 
    {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(props)
    })

    return (await response).json()
}


export {createAccount, isUsernameAvailable}