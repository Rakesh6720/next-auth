import CreateEventForm from '@/components/form/CreateEventForm';
import CreateEventForm2 from '@/components/form/CreateEventForm2';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

async function page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <div>Please login...</div>
    }

    return (
        // <div><CreateEventForm session={session} /></div>
        <div><CreateEventForm2 session={session}/></div>
    )
}

export default page