import useSWR from "swr"
import { URL } from "url";
import { CollectionDataType, UserDataType } from "./Types";

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

export { getUserData, useUser, useCollections}