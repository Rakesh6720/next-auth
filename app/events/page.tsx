import { getAllEvents } from '@/lib/actions'
import React from 'react'
import EventCard from '../_components/EventCard';

async function page() {
    const events = await getAllEvents();

    if (!events) return <h3>No events</h3>

    return (
        <div className='w-full h-full mt-[10rem]'>
            {events && events.map((event) => (
                <div key={event.id}>
                    <EventCard key={event.id} event={event} />
                </div>
            ))}
        </div>
    )
}

export default page