import { getAllEvents } from '@/lib/actions'
import React, { useEffect, useState } from 'react'
import EventCard from '../_components/EventCard';
import { useSearchParams } from 'next/navigation';

async function page({searchParams}: any) {    
    const {query} = searchParams;

    console.log("query equals: ", query);

    let events = await getAllEvents(query);

    if (!events || events.length === 0) return <h3 className='m-[5rem]'>No events</h3>

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