"use client";

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter();
    const pathName = usePathname();    
    const searchInput = useRef<HTMLInputElement | null>(null);      

    useEffect(() => {
      searchInput.current?.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();                   
          router.push(`/events?query=${searchTerm}`);          
        }
      });      
    }, [searchInput, searchTerm])
    

    if (!pathName.includes("events")) {
      return null;
    }

    const handleClick = () => {
        const encodedURI = encodeURI(searchTerm);
        router.push(`/events?query=${encodedURI}`);        
    }

  return (
    <div>        
        <input className='rounded-lg mx-3 px-3 py-1' type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} ref={searchInput}/>
        <button onClick={handleClick}>Search</button>
    </div>
  )
}
