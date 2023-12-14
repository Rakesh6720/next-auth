"use client";

import { Button } from "@/components/ui/button";
import { addUserToEvent, getEventById, isUserAttendingEvent, removeUserFromEvent } from "@/lib/actions";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Event } from "@prisma/client";

interface EventDetailsProps {
  event: Event,
  attending: boolean | null | undefined,
}


function EventDetailsComponent({ event, attending }: EventDetailsProps) {
  const [isAttending, setIsAttending] = useState(attending);

  const addUser = async () => {
    const response = await addUserToEvent(event.id);
    if (response.ok) {
      console.log(response.event);
      setIsAttending(true);
    }
  }

  const removeUser = async () => {
    const response = await removeUserFromEvent(event.id);
    const { data, error, status, ok } = response;
    if (!ok) {
      console.log(error);
    } else {
      console.log(data);
      setIsAttending(false);
    }
  }

  if (!event) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{event.name}</h1>
      {isAttending ? (
        <Button onClick={addUser}>Unattend</Button>
      ) : (
        <Button onClick={removeUser}>Attend</Button>
      )}
    </div>
  );
}

export default EventDetailsComponent;
