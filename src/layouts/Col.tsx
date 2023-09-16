import { ReactNode } from "react";


export default function Col({gap, children}: {gap?: number, children: ReactNode | ReactNode[]}){
    return <div className={`flex flex-col gap-${gap? gap: 0}`}>{children}</div>
}