import UserAccountNav from '@/components/UserAccountNav';
import { buttonVariants } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { HandMetal } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

async function Navbar() {
    const session = await getServerSession(authOptions);
    return (
        <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed top-0 w-full z-10'>
            <div className='container flex items-center justify-between'>
                <Link href="/"><HandMetal /></Link>
                {session?.user ? (
                    <UserAccountNav />
                ) : (
                    <Link href="/sign-in" className={buttonVariants()}>Sign in</Link>
                )}
            </div>
        </div >
    )
}

export default Navbar