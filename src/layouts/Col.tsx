import { ReactNode } from "react";


export default function Col({gap, children, className}: {gap?: number, children: ReactNode | ReactNode[], className?: string}){
    return <div className={`flex flex-col gap-${gap? gap: 0} ${className}`}>{children}</div>
}