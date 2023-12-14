import { getAllEvents } from '@/lib/actions'
import React from 'react'
import EventCard from '../_components/EventCard';

async function page() {
    const events = await getAllEvents();

    return (
        <div className='grid grid-cols-4 gap-8 w-full h-full mt-[100px] p-10'>
            {events && events.map((event) => (
                <div>
                    <EventCard key={event.id} event={event} />
                </div>
            ))}
        </div>
    )
}

export default page