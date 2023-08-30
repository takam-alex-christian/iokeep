

export default function IconButton(props: {children: React.ReactNode, onBlur?: ()=> void , onClick?: (e: React.MouseEvent) => void}){
    return (
        <button onBlur={props.onBlur} onClick={props.onClick} className="flex justify-center items-center w-10 h-10 bg-stone-100 text-dark rounded-2xl">
            {props.children}
        </button>
    )
}