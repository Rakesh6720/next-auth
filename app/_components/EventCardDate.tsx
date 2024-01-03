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
    const event_date = new Date(event.date);
    const day_index = event_date.getDay();    
    const day = dayNames[day_index];
    const shortened_day = day.substring(0, 3).toUpperCase();
    
    const month_index = event_date.getMonth();
    const month = months[month_index];
    const shortened_month = month.substring(0,3).toUpperCase();
    
    const date = event_date.getDate();    

    const time = new Intl.DateTimeFormat('en-US', {timeStyle: "short"}).format(event_date);   

    return {
        day: shortened_day,
        month: shortened_month,
        date: date,
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
