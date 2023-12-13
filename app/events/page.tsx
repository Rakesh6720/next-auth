import { getAllEvents } from '@/lib/actions'
import { Event } from '@prisma/client';
import React from 'react'
import EventCard from '../_components/EventCard';

async function page() {
    const events = await getAllEvents();
    return (
        <div className='grid grid-cols-4 gap-8 w-full h-full mt-[100px] p-10'>
            {events.map((event: Event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    )
}

export default page