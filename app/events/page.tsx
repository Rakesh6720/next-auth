import { getAllEvents } from '@/lib/actions'
import React from 'react'
import EventCard from '../_components/EventCard';

async function page() {
    const events = await getAllEvents();

    if (!events) return <h3>No events</h3>

    return (
        <div className='mt-[4rem] mb-[3rem]'>
            {events && events.map((event) => (
                <div key={event.id}>
                    <EventCard key={event.id} event={event} />
                </div>
            ))}
        </div>
    )
}

export default page