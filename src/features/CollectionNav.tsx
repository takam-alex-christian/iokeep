import { Note as NoteIcon, Trash as TrashIcon, DocumentCopy, Additem as AdditemIcon, Add as AddIcon } from "iconsax-react"

export default function CollectionNav() {
    return (
        <div className="flex flex-col justify-between gap-8 col-span-1">
            {/* utility collections */}


            <div className="flex flex-col gap-4 ">

                <h3 className="p-4 text-lg font-bold text-dark">COLLECTIONS </h3>

                <div className="flex flex-col gap-2">
                    <CollectionButton label={"Business notes"} key="1" />
                    <CollectionButton label={"Daily planner notes"} key={2} />
                    <CollectionButton label={"life lessons"} key={3} />
                </div>
                {/* <hr className=" text-slate-100" />

                <div className="flex flex-col">
                    <button><div className="flex flex-row gap-4 px-4 py-2"><TrashIcon size={24} color="#000" /> <span>Trash</span></div></button>
                </div> */}

                <hr className="w-4/5 text-slate-100" />

                <div className="flex flex-col gap-2">
                    <button className="w-fit bg-stone-100 rounded-2xl">
                        <div className="flex flex-row gap-4 p-4">
                            <AdditemIcon size={24} color="#000" />

                            <span>New collection</span>
                        </div>

                    </button>

                    <button className="w-fit bg-green-600 text-white rounded-2xl">
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

function CollectionButton(props: {
    label?: string
}) {

    return (
        <button className="flex flex-row justify-start items-center py-2 px-4 gap-4 ">
            {/* <NoteIcon size="24" color="#000"/> */}
            <DocumentCopy color="#000" />
            <span>{props.label}</span>
        </button>
    )
}
