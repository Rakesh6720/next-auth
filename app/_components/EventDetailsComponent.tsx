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

interface EventDetailsProps {
  event: Event
  attending: boolean,
  email: string
}


function EventDetailsComponent({ event, attending, email }: EventDetailsProps) {
  const [isAttending, setIsAttending] = useState(attending);
  const { toast } = useToast();

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
    <div className="flex flex-col">
      <h1>{event.name}</h1>
      {isAttending ? (
        <Button onClick={removeUser}>Unattend</Button>
      ) : (
        <Button onClick={addUser}>Attend</Button>
      )}
      Organized by: {email}
    </div>
  );
}

export default EventDetailsComponent;
