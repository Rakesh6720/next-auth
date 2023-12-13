import EventDetailsComponent from '@/app/_components/EventDetailsComponent';
import { getEventById } from '@/lib/actions';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { event } = await getEventById(+id);
    console.log("id: ", id)

    if (event) {
        return (
            <EventDetailsComponent event={event} />
        )
    }

    return <div>Event not found...</div>

}

export default page