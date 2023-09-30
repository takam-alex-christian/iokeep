
type BackendDeleteRequestReturnType = {
    deleted: boolean, //is true if an object is deleted
    message: string // contains all messages for reference
}

export function backendDeleteRequest(noteId: string): BackendDeleteRequestReturnType {

    let returnObject: BackendDeleteRequestReturnType = {
        deleted: false,
        message: ""
    }

    fetch("/notes", {
        method: "DELETE",
        body: JSON.stringify({ noteId }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json(), (err) => {
        console.log("will throw err")
        throw err;
    }).then((jsonResponse) => {

        console.log(jsonResponse)
        
        returnObject = {
            deleted: jsonResponse.isError == false,
            message: ""
        }
    })

    return returnObject
}