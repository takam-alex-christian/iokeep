
import { useContext } from "react"

import { appDataContext, appUiContext } from "@/libs/contexts"

import { Note as NoteIcon, Trash as TrashIcon, DocumentCopy, Additem as AdditemIcon, Add as AddIcon } from "iconsax-react"

import { useUser } from "@/libs/getDataFromBackend"
import { CollectionDataType } from "@/libs/Types"

export default function CollectionNav() {



    const { appDataState, appDataDispatch } = useContext(appDataContext)

    const { appUiDispatch } = useContext(appUiContext)

    function createCollectionButtonHandler(e: React.MouseEvent<HTMLButtonElement>) { //essentially what happens when you press the "create collection" button

        e.preventDefault();

        appUiDispatch({ type: "show_modal", payload: { view: "create_collection" } })

    }

    function addNoteButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();


        appUiDispatch({ type: "show_modal", payload: { view: "add_note" } });
    }


    function switchCollectionButtonHandler(collectionName: string) {//essentially where we dispacht a collection change

        appDataDispatch({ type: "switch_current_collection", payload: { collectionName } })
    }

    return (
        <div className="flex flex-col justify-between gap-8 col-span-1">
            {/* utility collections */}


            <div className="flex flex-col gap-4 ">

                <h3 className="p-4 text-lg font-bold text-dark">COLLECTIONS </h3>

                <div className="flex flex-col gap-2">
                    {/* <CollectionButton label={"Business notes"} key="1" />
                    <CollectionButton label={"Daily planner notes"} key={2} />
                    <CollectionButton label={"life lessons"} key={3} /> */}

                    {appDataState.collections.map((eachCollection, index) => {
                        return (<CollectionButton label={eachCollection.name} onClick={() => { switchCollectionButtonHandler(eachCollection.name) }} key={index} />)
                    })}

                </div>

                <CollectionList />

                {/* <hr className=" text-slate-100" />

                <div className="flex flex-col">
                    <button><div className="flex flex-row gap-4 px-4 py-2"><TrashIcon size={24} color="#000" /> <span>Trash</span></div></button>
                </div> */}

                <hr className="w-4/5 text-slate-100" />

                <div className="flex flex-col gap-2">
                    <button onClick={createCollectionButtonHandler} className="w-fit bg-stone-100 rounded-2xl">
                        <div className="flex flex-row gap-4 p-4">
                            <AdditemIcon size={24} color="#000" />
                            <span>New collection</span>
                        </div>

                    </button>

                    <button onClick={addNoteButtonHandler} className="w-fit bg-green-600 text-white rounded-2xl">
                        <div className="flex flex-row gap-4 p-4">
                            <AddIcon size={24} />
                            <span>Add Note</span>
                        </div>

                    </button>
                </div>

            </div>

        </div>
    )
}

function CollectionList(props: {}) {
    const { userData, isError, isLoading } = useUser();

    if (isLoading) return (<div>loading collections</div>)
    else console.log(userData)
    // return (
    //     <div className="flex flex-col gap-2">
    //         {/* <CollectionButton label={"Business notes"} key="1" />
    //                 <CollectionButton label={"Daily planner notes"} key={2} />
    //                 <CollectionButton label={"life lessons"} key={3} /> */}

    //         {/* {appDataState.collections.map((eachCollection, index) => {
    //             return (<CollectionButton label={eachCollection.name} onClick={() => { switchCollectionButtonHandler(eachCollection.name) }} key={index} />)
    //         })} */}

            
    //     </div>
    // )
}

function CollectionButton(props: {
    label?: string,
    onClick?: () => void
}) {

    return (
        <button onClick={props.onClick} className="flex flex-row justify-start items-center py-2 px-4 gap-4 ">
            {/* <NoteIcon size="24" color="#000"/> */}
            <DocumentCopy color="#000" />
            <span>{props.label}</span>
        </button>
    )
}
