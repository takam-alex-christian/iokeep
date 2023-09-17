import { ReactNode } from "react";


export default function Row({children, gap, className}: {children: ReactNode[] | ReactNode, gap?: number, className?: string}) {
    return (
        <div className={`flex flex-row gap-${gap? gap.toString() : "0"} ${className}`} >
            {children}
        </div>
    )
}