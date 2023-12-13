import { getAllEvents } from '@/lib/actions'
import { Event } from '@prisma/client';
import React from 'react'
import EventCard from '../_components/EventCard';
import { UnsplashImage } from '@/types/unsplash-image';

async function page() {
    const events = await getAllEvents();
    //const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY);
    //const image: UnsplashImage = await response.json();
    return (
        <div className='grid grid-cols-4 gap-8 w-full h-full mt-[100px] p-10'>
            {events.map((event: Event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    )
}

export default page