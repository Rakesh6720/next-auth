import { getAllEvents } from '@/lib/actions'
import { Event } from '@prisma/client';
import React from 'react'

async function page() {
    const events = await getAllEvents();
    return (
        <div>
            <ul>
                {events.map((event: Event) => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default page