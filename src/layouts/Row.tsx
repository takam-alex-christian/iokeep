import { ReactNode } from "react";


export default function Row({children, gap}: {children: ReactNode[] | ReactNode, gap?: number}) {
    return (
        <div className={`flex flex-row gap-${gap? gap.toString() : "0"}`} >
            {children}
        </div>
    )
}