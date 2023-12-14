import EventDetailsComponent from '@/app/_components/EventDetailsComponent';
import { getEventById } from '@/lib/actions';
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { event } = await getEventById(+id);
    const session = await getServerSession();

    if (event && session) {
        return (
            <EventDetailsComponent event={event} />
        )
    }

    return <div>Event not found...</div>

}

export default page