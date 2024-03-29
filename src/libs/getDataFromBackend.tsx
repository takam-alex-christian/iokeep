import useSWR from "swr"
import { URL } from "url";
import { CollectionDataType, NoteDataType, UserDataType } from "./Types";
import { useContext } from "react";
import { appDataContext } from "./contexts";

async function getUserData() {
    let userData = await fetch("/user", {
        method: "GET"
    });

    return (await userData).json();
}

//@ts-ignore
const fetcher = (...args)=> fetch(...args).then((res)=>res.json())

function useUser() {
    const { data, error, isLoading } = useSWR<UserDataType>(`/user`, fetcher)

    return {
        userData: data,
        isLoading,
        isError: error,
    }
}

function useCollections(){

    const {data, error, isLoading, mutate} = useSWR<{collections: CollectionDataType[]}>("/collections", fetcher)

    return {
        collectionsData: data,
        isLoading,
        isError: error,
        setCollectionsData: mutate
    }
}


//get's notes with use of _collectionId.
function useNotes(){
    const {appDataState} = useContext(appDataContext);
    const {data, error, isLoading, mutate} = useSWR<{notes: NoteDataType[]}>(appDataState.currentCollection._collectionId.length > 0 ? `/notes?_collectionId=${appDataState.currentCollection._collectionId}`: null, fetcher);

    return {
        notesData: data,
        isNotesLoading: isLoading,
        isNotesError: error,
        setNotesData: mutate
    }
}

export { getUserData, useUser, useCollections, useNotes}