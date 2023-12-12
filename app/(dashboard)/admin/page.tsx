import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth'
import React from 'react'

async function page() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        return <h2 className='text-2xl'>Admin Page - Welcome back, {session?.user.username}!</h2>
    }
    return (
        <h2 className='text-2xl'>Please login to see this admin page</h2>
    )
}

export default page