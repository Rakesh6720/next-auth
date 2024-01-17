import React from 'react'
import { Event } from '@prisma/client';

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const formatEventDate = (event: Event) => {
    const event_start_date_time = new Date(event.startDateTime);
    const start_day_index = event_start_date_time.getDay();    
    const start_day = dayNames[start_day_index];
    const shortened_start_day = start_day.substring(0, 3).toUpperCase();
    
    const start_month_index = event_start_date_time.getMonth();
    const month = months[start_month_index];
    const shortened_month = month.substring(0,3).toUpperCase();
    
    const start_date = event_start_date_time.getDate();    

    const time = new Intl.DateTimeFormat('en-US', {timeStyle: "short"}).format(event_start_date_time);   

    return {
        day: shortened_start_day,
        month: shortened_month,
        date: start_date,
        time: time
    }
}

export default function EventCardDate({event}: {event: Event}) {
    const {day, month, date, time} = formatEventDate(event);

    return (        
        <h3 className='font-semibold text-neutral-500 line-clamp-1'>
            {day}, {month} {date} · {time}
        </h3>        
    )
}
