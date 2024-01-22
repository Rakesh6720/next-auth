import MyEventsComponent from '@/app/_components/MyEventsComponent';
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
        <MyEventsComponent heading="My Organized Events" myEvents={myOrganizedEvents}/>
        {isEarlierThanToday.length > 0 &&    
            <MyEventsComponent heading="Events I've Attended" myEvents={isEarlierThanToday}/>            
        }
        {isLaterThanToday.length > 0 &&
            <MyEventsComponent heading="Upcoming Events I'm Attending" myEvents={isLaterThanToday}/>
        }                
    </div>
  )
}
