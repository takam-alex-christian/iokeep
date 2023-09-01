import { CollectionDataType, NoteDataType } from "./Types";

async function postCollectionToBackend(props: CollectionDataType){
    let jsonResponse = await fetch("/collection", {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
            "Content-Type": "application/json"
        }
    })

    return await jsonResponse.json()
}


async function postNoteToBackend(props: NoteDataType){
    let jsonResponse = await fetch("/notes", {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
            "Content-Type": "application/json"
        }
    })

    return await jsonResponse.json()
}

export {postCollectionToBackend, postNoteToBackend}