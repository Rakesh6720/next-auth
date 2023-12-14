"use client";

import { Event, MembersAttendingEvents, User } from '@prisma/client'
import { useRouter } from 'next/navigation';

type Props = {
    event: Event & { attendees: MembersAttendingEvents[] }
}

function EventCard({ event }: Props) {
    const router = useRouter();

    return (
        <div className="bg-red-500 cursor-pointer" onClick={() => router.push(`/events/${event.id}`)}>
            {event.name}
            <p>Number Attending: {event.attendees.length}</p>
        </div>
    )
}

export default EventCard