import { getEventsByAttendee, getEventsByOrganizer } from '@/lib/actions';
import { Event } from '@prisma/client';
import { getServerSession } from 'next-auth'
import Link from 'next/link';
import React from 'react'

export default async function page() {
    const session = await getServerSession();
    const user = session?.user;

    let myOrganizedEvents;
    let myAttendingEvents;

    if (user?.email != null) {        ;
        myOrganizedEvents = await getEventsByOrganizer(user.email);
        myAttendingEvents = await getEventsByAttendee(user.email);
    }
    
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let isLaterThanToday: Event[] = [];
    let isEarlierThanToday: Event[] = [];

    myAttendingEvents?.forEach((event) => {
        let date = new Date(event.endDateTime);
        if (date > today) {
            isLaterThanToday.push(event);
        } else {
            isEarlierThanToday.push(event);
        }
    });

  return (
    <div className='mt-[8rem] ml-[3rem] flex flex-col gap-3'>
        <div className='border-black border shadow-md p-5 w-1/2 rounded-md'>
            <h1 className='font-semibold underline text-xl mb-3'>My Organized Events</h1>
            <ul>
                {myOrganizedEvents?.map(event => (
                    <li className='m-2'>
                        <Link key={event.id} href={`/events/${event.id}`}>{event.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
        {isEarlierThanToday.length > 0 && 
            <div>
                <h1>Events I've Attended:</h1>
                {isEarlierThanToday?.map(event => (
                    <Link href={`/events/${event.id}`}><h3 key={event.id}>{event.name}</h3></Link>
                ))}            
            </div>
        }
        <div>
            <h1>Upcoming events I'm attending:</h1>
            {isLaterThanToday.map(event => (
                <Link key={event.id} href={`/events/${event.id}`}>{event.name}</Link>
            ))}
        </div>
    </div>
  )
}
