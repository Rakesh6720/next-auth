import { Event } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

function MyEventsComponent({myEvents, heading}: {myEvents?: Event[], heading: string}) {
  return (
    <div className='border-black border shadow-md p-5 w-1/2 rounded-md'>
        <h1 className='font-semibold underline text-xl mb-3'>{heading}</h1>
        <ul>
            {myEvents?.map(event => (
                <li className='m-2'>
                    <Link key={event.id} href={`/events/${event.id}`}>{event.name}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default MyEventsComponent