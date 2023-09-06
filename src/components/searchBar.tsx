
import { SearchNormal1 } from "iconsax-react"

import React from 'react'

export default function SearchBar() {
    return (
        <div className="w-full">
            <form action="w-full">
                <div className="flex flex-row justify-start border  border-slate-200 h-12 rounded-full">
                    <label className="flex flex-row gap-4 h-full w-full px-4 items-center">
                        <div ><SearchNormal1 size="24" color="#474E41" variant="Outline" /></div>
                        <div className="flex-1"><input type="search" className="w-full focus:outline-none bg-inherit" placeholder="Search feature coming soon..." /></div>
                    </label>
                </div>
            </form>
        </div>
    )
}
