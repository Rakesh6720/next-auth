"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeSearch() {
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();

    const setQueryParams = (e: any) => {
       setInputValue(e.target.value);   
    }

    const handleSearch = () => {
        const queryParams = encodeURI(inputValue);
        router.push(`/events?query=${queryParams}`);
    }
    
  return (
    <div id="search-home" className={`flex justify-center m-3}`}>
        <input type="text" placeholder='search events' value={inputValue} onChange={(e) => setQueryParams(e)} className='px-2 py-1 border rounded-md w-2/3'/>
        <button className="rounded-md border p-2" onClick={handleSearch}>Search</button>
    </div>
  )
}
