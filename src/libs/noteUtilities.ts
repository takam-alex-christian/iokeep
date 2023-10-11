import type { NoteDataType } from "@/libs/Types"

type BackendDeleteRequestReturnType = {
    deleted: boolean, //is true if an object is deleted
    message: string // contains all messages for reference
}

function backendDeleteRequest(noteId: string): BackendDeleteRequestReturnType {

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

//edit note function implementation
//not yet tested
function updateNoteToBackend(props: Partial<NoteDataType>) {

    let returnObject: {
        updated: boolean,
        isError: boolean,
        message: string
    } = {
        updated: false,
        isError: false,
        message: ""
    }

    fetch("/notes", {
        method: "PATCH",
        body: JSON.stringify(props),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res => res.json()), (err) => { console.log(err) }).then((jsonResponse: { success: boolean, message: "string", isError: boolean }) => {
        returnObject = { updated: jsonResponse.success, isError: jsonResponse.isError, message: jsonResponse.message }
        console.log(returnObject)
    })

    return returnObject

}

export { backendDeleteRequest, updateNoteToBackend }