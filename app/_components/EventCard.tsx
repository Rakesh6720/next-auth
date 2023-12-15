"use client";

import { Event } from '@prisma/client'
import Link from 'next/link';

type Props = {
    event: Event
}

function EventCard({ event }: Props) {
    return (
        <div className="bg-red-500 cursor-pointer">
            <Link href={`/events/${event.id}`}>
                {event.name}
                {event.id}
                <p>Number Attending: {event.attendees.length}</p>
            </Link>
        </div>
    )
}

export default EventCard