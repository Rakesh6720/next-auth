import EventDetailsComponent from '@/app/_components/EventDetailsComponent';
import { useToast } from '@/components/ui/use-toast';
import { addUserToEvent, getEventById, isUserAttendingEvent, } from '@/lib/actions';
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { event } = await getEventById(+id);
    const session = await getServerSession();
    console.log("Server session is: ", session);

    if (!event) {
        return <div>Loading...</div>
    }

    const isUserAttending = await isUserAttendingEvent(event.id);

    if (event && session) {
        return (
            <EventDetailsComponent event={event} attending={isUserAttending.data} email={session.user.email} />
        )
    }

    return <div>Event not found...</div>

}

export default page