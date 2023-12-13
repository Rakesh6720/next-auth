import { UnsplashImage } from '@/types/unsplash-image'
import { Event } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

function EventCard({ event, image }: { event: Event, image?: UnsplashImage }) {

    let width;
    let height;

    if (image) {
        width = Math.min(500, image.width);
        height = Math.min(500, image.height);
    }


    return (
        <div className="bg-red-500">
            {image && (
                <Image src={image.urls.raw} alt={event.name} width={width} height={height} className='object-cover' />
            )}
            {event.name}
        </div>
    )
}

export default EventCard