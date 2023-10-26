import { CollectionDataType } from "./Types";


async function findCollectionByIdAndDelete(_collectionId: string){
    let result: {success: boolean} = {success: false};

    await fetch("/collection", {
        method: "DELETE",
        body: JSON.stringify({_collectionId}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then((jsonResponse: {isError: boolean, message: string}) =>{
        if(!jsonResponse.isError) result.success = true
    })

    return result
}

async function findCollectionByIdAndUpdate(props: Partial<CollectionDataType>){
    let result: {success: boolean} = {success: false}

    await fetch("/collection", {
        method: "PATCH",
        body: JSON.stringify({...props}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then((jsonResponse: {isError: boolean, message: string})=>{
        if(!jsonResponse.isError) result.success = true
    })

    return result
}

export {findCollectionByIdAndDelete, findCollectionByIdAndUpdate}