import useSWR from "swr"

async function getUserData() {
    let userData = fetch("/user", {
        method: "GET"
    });

    return (await userData).json();
}

function useUser() {
    const { data, error, isLoading } = useSWR(`/user`, fetch)

    return {
        userData: data,
        isLoading,
        isError: error,
    }
}

export { getUserData, useUser}