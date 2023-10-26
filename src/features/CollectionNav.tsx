
import { useContext, useEffect } from "react"

import { appDataContext, appUiContext } from "@/libs/contexts"

import { Note as NoteIcon, Trash as TrashIcon, DocumentCopy, Additem as AdditemIcon, Add as AddIcon } from "iconsax-react"

import { useCollections, useUser } from "@/libs/getDataFromBackend"

import type { CollectionDataType } from "@/libs/Types"
import BlockLoadingPlaceholder from "@/components/BlockLoadingPlaceholder"
import Col from "@/layouts/Col"
import Row from "@/layouts/Row"
import DottedMenu, { DottedMenuOption } from "./DottedMenu"

//ic
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { findCollectionByIdAndDelete } from "@/libs/collectionUtilities"


export default function CollectionNav() {


    const { appDataState, appDataDispatch } = useContext(appDataContext)

    const { appUiDispatch, appUiState } = useContext(appUiContext)

    const { collectionsData } = useCollections();

    function createCollectionButtonHandler(e: React.MouseEvent<HTMLButtonElement>) { //essentially what happens when you press the "create collection" button

        e.preventDefault();

        appUiDispatch({ type: "show_modal", payload: { view: "create_collection" } })

    }


    function addNoteButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();


        appUiDispatch({ type: "show_modal", payload: { view: "add_note" } });
    }


    return (
        <div className="flex flex-col justify-between gap-8 max-w-xs">
            {/* utility collections */}


            <div className="flex flex-col gap-4 ">

                {/* <h3 className={"p-4 text-lg font-bold " + `${appUiState.uiMode == "light" ? "text-zinc-800" : "text-zinc-500"}`}>COLLECTIONS </h3> */}

                {
                    collectionsData?.collections.length == 0 &&
                    <div className={"px-4 text-base font-semibold " + `${appUiState.uiMode == "light" ? "text-zinc-700" : "text-zinc-600"}`}>
                        No collection
                    </div>
                }

                <CollectionList />

                {/* <hr className=" text-slate-100" />

                <div className="flex flex-col">
                    <button><div className="flex flex-row gap-4 px-4 py-2"><TrashIcon size={24} color="#000" /> <span>Trash</span></div></button>
                </div> */}

                <hr className={"w-4/5  " + `${appUiState.uiMode == "light" ? "text-zinc-300" : "text-zinc-800"}`} />

                <div className="flex flex-col gap-2">
                    <button
                        onClick={createCollectionButtonHandler}
                        className={"w-fit  rounded-2xl " + `${appUiState.uiMode == "light" ? "bg-stone-100 text-zinc-700" : "bg-zinc-700 text-zinc-400"}`}>
                        <div className="flex flex-row gap-4 p-4">
                            <AdditemIcon size={24} color={`${appUiState.uiMode == "light" ? "#474E41" : "#959E99"}`} />
                            <span>New collection</span>
                        </div>

                    </button>

                    <button
                        onClick={addNoteButtonHandler}
                        className="w-fit bg-green-600 text-white rounded-2xl">
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

    const { collectionsData, isError, isLoading: isCollectionsDataLoading } = useCollections();

    const { appDataDispatch, appDataState } = useContext(appDataContext)


    function switchCollectionButtonHandler({ collectionName, _collectionId }: { collectionName: string, _collectionId: string }) {//essentially where we dispacht a collection change
        //
        appDataDispatch({ type: "switch_current_collection", payload: { collectionName: collectionName, _collectionId: _collectionId } })
    }


    if (isCollectionsDataLoading) return (<BlockLoadingPlaceholder />)
    else
        return (
            <Col>

                {collectionsData?.collections.map((eachCollection, index) => {
                    return (<CollectionButton label={eachCollection.collectionName} _collectionId={eachCollection._collectionId} onClick={() => { switchCollectionButtonHandler({ collectionName: eachCollection.collectionName, _collectionId: eachCollection._collectionId }) }} key={index} />)
                })}
            </Col>
        )

}

function CollectionButton(props: {
    label: string,
    _collectionId: string
    onClick: () => void
}) {

    const { appUiState, appUiDispatch } = useContext(appUiContext)
    const { appDataState, appDataDispatch} = useContext(appDataContext)

    const thisDottedMenuOptions: DottedMenuOption[] = [
        {
            icon: <FontAwesomeIcon icon={faPencil} />,
            label: "Edit",
            clickHandler: (e: React.MouseEvent) => {
                //what should happen to this collection once this button is clicked
                appDataDispatch({type: "switch_target_collection", payload: {_collectionId: props._collectionId}});
                appUiDispatch({type: "show_modal", payload: {view: "edit_collection"}});
            }
        },
        {
            icon: <FontAwesomeIcon icon={faTrashCan} />,
            label: "Delete",
            clickHandler: async (e: React.MouseEvent) => {
                let {success} = (await findCollectionByIdAndDelete(props._collectionId))

                if(success){
                    console.log("deleted successfully")

                    //mutate collection list
                }
            }
        }
    ]

    return (
        <Row className={`group relative justify-between rounded-2xl ${appUiState.uiMode == "dark" ? "hover:bg-zinc-800" : "hover:bg-zinc-300"} ${appDataState.currentCollection._collectionId == props._collectionId ? `${appUiState.uiMode == "dark" ? "bg-zinc-800" : "bg-zinc-300"}` : ""}`}>
            <button onClick={props.onClick} className={`flex w-full py-3 pr-12 justify-start items-center `}>
                {/* <NoteIcon size="24" color="#000"/> */}
                    <Row gap={2} className="pl-4 ">
                        <DocumentCopy color={`${appUiState.uiMode == "light" ? "#474E41" : "#959E99"}`} />
                        <p className={`max-w-[220px] whitespace-nowrap text-left text-ellipsis overflow-hidden ${appUiState.uiMode == "light" ? "text-zinc-700" : "text-zinc-500"}`}>{props.label}</p>

                    </Row>

            </button>

            <DottedMenu
                options={thisDottedMenuOptions}
                className="invisible group-hover:visible absolute right-4 top-3"
            />
        </Row>


    )
}
