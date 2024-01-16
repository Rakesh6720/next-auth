import EventDetailsComponent from '@/app/_components/EventDetailsComponent';
import { useToast } from '@/components/ui/use-toast';
import { addUserToEvent, getEventById, getLocationById, getOrganizerName, isUserAttendingEvent, } from '@/lib/actions';
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { event } = await getEventById(+id);
    const {organizerName} = await getOrganizerName(event?.organizerId);
    const {location} = await getLocationById(event?.locationId);
    const session = await getServerSession();
    console.log("Server session is: ", session);

    if (!event) {
        return <div>Loading...</div>
    }

    const isUserAttending = await isUserAttendingEvent(event.id);

    if (event && session) {
        return (
            <>
            <div className='mt-[5rem] px-10 border-b py-3'>
                <h1 className='text-3xl font-extrabold py-3'>{event.name}</h1>
                <p>Hosted by:</p>
                <p className='font-bold'>{organizerName?.email}</p>
            </div>
            <div className='flex flex-col'>
                <p>When: {event.date}</p>
                <p>Where: {location?.name}</p>
                <p>{location?.buildingNo} {location?.street} · {location?.city}, {location?.state}</p>
            </div>
            <div>
                <h3>Details:</h3>
                <p>{event.description}</p>
            </div>
            <EventDetailsComponent event={event} attending={isUserAttending.data} email={session.user.email} />
            </>
            
        )
    }

    return <div>Event not found...</div>

}

export default page