import { buttonVariants } from '@/components/ui/button'
import { HandMetal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed top-0 w-full z-10'>
            <div className='container flex items-center justify-between'>
                <Link href="/"><HandMetal /></Link>
                <Link href="/sign-in" className={buttonVariants()}>Sign in</Link>
            </div>
        </div>
    )
}

export default Navbar