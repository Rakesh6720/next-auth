"use client";

import { Button } from "@/components/ui/button";
import { addUserToEvent, getEventById, isUserAttendingEvent, removeUserFromEvent } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { isatty } from "tty";
import EventCardDate from "./EventCardDate";

interface EventDetailsProps {
  event: Event
  attending: boolean,
  email: string | undefined | null
}


function EventDetailsComponent({ event, attending, email }: EventDetailsProps) {
  const [isAttending, setIsAttending] = useState(attending);
  const [hasEventPassed, setEventHasPassed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {    
    if (+new Date(event.endDateTime) < Date.now()) {
      setEventHasPassed(true);      
    } else {
      setEventHasPassed(false);      
    }
    console.log("set event has passed: ", hasEventPassed);
  }, [hasEventPassed])

  const addUser = async () => {
    const response = await addUserToEvent(event.id);    
    if (response.ok) {
      setIsAttending(true);
    } else {
      console.log(response.error)
    }
  }

  const removeUser = async () => {
    const response = await removeUserFromEvent(event.id);    
    if (response.ok) {
      console.log("Removing user successful");
      setIsAttending(false);
    } else {
      console.log(response.error);
    }
  }
  
  if (!event) {
    return <div>Loading...</div>
  }

  return (  
    <div className="fixed bottom-0 flex border-t w-full bg-white justify-center items-center ">
        <div className="flex flex-col justify-center py-8">
          <div className="px-10">
            <EventCardDate event={event}/>
          </div>          
          <div className="px-10">
            <p>{event.name}</p>
          </div>
        </div>
        {!hasEventPassed ? (
          <div>
            {isAttending ? (
              <Button onClick={removeUser} className="bg-red-500">Unattend</Button>
            ) : (
              <Button onClick={addUser} className="bg-green-500">Attend</Button>
            )}
          </div>
        ) : (
          <div>
            <Button disabled>Event has ended</Button>
          </div>
        )}
        
    </div>
    
  );
}

export default EventDetailsComponent;
