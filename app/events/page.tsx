import { getAllEvents } from "@/lib/actions";
import React from "react";
import EventCard from "../_components/EventCard";
import { Event } from "@prisma/client";

async function page({ searchParams }: any) {
  const { query } = searchParams;

  console.log("query equals: ", query);

  let events = await getAllEvents(query);
  const arrayWithoutPastEvents: Event[] = [];

  if (!events || events.length === 0)
    return (
      <h3 className="m-[5rem]">No events</h3>
    );

  if (events.length > 0) {
    events.forEach((event, index) => {
      const now = new Date();
      const eventDate = new Date(
        event.startDateTime
      );
      if (
        eventDate.getTime() > now.getTime()
      ) {
        arrayWithoutPastEvents.push(
          events![index]
        );
      }
    });
  }

  return (
    <div className="mt-[4rem] mb-[3rem]">
      {arrayWithoutPastEvents &&
        arrayWithoutPastEvents.map(
          (event) => (
            <div key={event.id}>
              <EventCard
                key={event.id}
                event={event}
              />
            </div>
          )
        )}
    </div>
  );
}

export default page;
