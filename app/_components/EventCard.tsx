import { Event } from '@prisma/client'
import React from 'react'

function EventCard({ event }: { event: Event }) {
    return (
        <div className='bg-red-500 w-[350px]] h-[350px]'>
            {event.name}
        </div>
    )
}

export default EventCard