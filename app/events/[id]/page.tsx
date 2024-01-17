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
            <div className='px-5 h-full mx-5'>
            <div className='mt-[5rem] border-b py-3'>
                <h1 className='text-3xl font-extrabold py-3'>{event.name}</h1>
                <p>Hosted by:</p>
                <p className='font-bold'>{organizerName?.username}</p>
            </div>
            <div className='flex flex-col mt-[2rem] leading-loose'> 
                <p className=''><span className='font-semibold'>Date:</span> {new Date(event.startDateTime).toDateString()}</p>               
                <p><span className='font-semibold'>Time:</span> {new Intl.DateTimeFormat('en-US', {timeStyle: "short"}).format(new Date(event.startDateTime))} - {new Intl.DateTimeFormat('en-US', {timeStyle: "short"}).format(new Date(event.endDateTime))}</p>                
                <p><span className='font-semibold'>Venue:</span> {location?.name}</p>
                <p><span className='font-semibold'>Address:</span> {location?.buildingNo} {location?.street} · {location?.city}, {location?.state}</p>
            </div>
            <div className='leading-loose mb-[10rem]'>
                <p><span className='font-semibold'>Details:</span> {event.description}</p>
            </div>
            <EventDetailsComponent event={event} attending={isUserAttending.data} email={session.user.email} />
            </div>
            
        )
    }

    return <div>Event not found...</div>

}

export default page