"use client"

import { Button } from '@/components/ui/button'
import { addUserToEvent } from '@/lib/actions';
import { Event } from '@prisma/client'
import { Session } from 'next-auth';
import React from 'react'

async function EventDetailsComponent({ event }: { event: Event }) {
    const eventId = event?.id;

    return (
        <div>
            <h1>{event?.name}</h1>
            <Button onClick={() => {
                addUserToEvent(Number(eventId))
            }}>Attend</Button>
        </div>
    )
}

export default EventDetailsComponent