

export default function ModalOverlay(props: { children: React.ReactNode[] | React.ReactNode }) {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[rgba(0,0,0,0.1)] z-40">
            {props.children}
        </div>
    )
}