import { Event } from '@prisma/client'
import Link from 'next/link';
import EventCardDate from './EventCardDate';

type Props = {
    event: Event
}



function EventCard({ event }: Props) {
    const attendees = event.attendees.length;
    return (
        <div className='w-[90%] flex-col border-t-2 border-neutral-400 my-2 p-3 mx-auto'>
            <EventCardDate event={event}/>
            <h2 className='font-semibold'>{event.name}</h2>
            <p>{event.description}</p>
            <p className='text-zinc-500 text-sm pt-10'>{attendees} {attendees == 0 || attendees > 1 ? "attendees" : "attendee"}</p>
        </div>
    )
}

export default EventCard