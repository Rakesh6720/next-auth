"use client";

import { Button } from "@/components/ui/button";
import { addUserToEvent, getEventById, isUserAttendingEvent, removeUserFromEvent } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

interface EventDetailsProps {
  event: Event
  attending: boolean
}


function EventDetailsComponent({ event, attending }: EventDetailsProps) {
  const [isAttending, setIsAttending] = useState(attending);
  const { toast } = useToast();

  const addUser = async () => {
    const response = await addUserToEvent(event.id);
    if (response.ok) {
      console.log("Adding user successful: ", response.event);
      setIsAttending(true);
      return;
    } else {
      console.log("Error adding user to event");
      console.error(response.error);
      toast({
        title: "Action Not Allowed",
        description: response.error,
        variant: "destructive"
      })
      setIsAttending(true);
    }
  }

  const removeUser = async () => {
    const response = await removeUserFromEvent(event.id);
    const { data, error, status, ok } = response;
    if (!ok) {
      console.log("Error removing user: ", error);
    } else {
      console.log("Removing user successful: ", data);
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
        <Button onClick={removeUser}>Unattend</Button>
      ) : (
        <Button onClick={addUser}>Attend</Button>
      )}
    </div>
  );
}

export default EventDetailsComponent;
