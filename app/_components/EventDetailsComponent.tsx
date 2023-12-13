import { Event } from '@prisma/client'
import React from 'react'

function EventDetailsComponent({ event }: { event: Event | null }) {
    return (
        <div>
            <h1>{event?.name}</h1>
        </div>
    )
}

export default EventDetailsComponent