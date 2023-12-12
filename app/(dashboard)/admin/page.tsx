import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth'
import React from 'react'

async function page() {
    const session = await getServerSession(authOptions);
    console.log(session);
    return (
        <div>Welcome to admin, {session?.user.username}!</div>
    )
}

export default page