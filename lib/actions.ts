"use server";

import { getServerSession } from "next-auth";
import { db } from "./db";
import { AttendeeResponse } from "@/types/attendee-response";
import { revalidatePath } from "next/cache";

export async function createEvent(data: any) {
    const {
        name,
        startDateTime,
        endDateTime,
        description,
        organizer,
        locationName,
        buildingNo,
        street,
        city,
        state,
        zip,
    } = data;

    const existingLocation = await db.location.findFirst({
        where: {
            name: locationName,
        },
    });

    const doesLocationExist: boolean = existingLocation ? true : false;
    let location;

    if (!doesLocationExist) {
        try {
            location = await db.location.create({
                data: {
                    name: locationName,
                    buildingNo: buildingNo,
                    street: street,
                    city: city,
                    state: state,
                    zip: zip,
                },
            });
        } catch (error) {
            console.log("There was an error creating the location: ", error);
        }
    } else {
        try {
            location = await db.location.findFirst({
                where: {
                    name: locationName,
                },
            });
        } catch (error) {
            console.log("There was an error fetching the location details: ", error);
        }
    }

    let newOrganizer;
    try {
        newOrganizer = await db.user.findUnique({
            where: {
                email: organizer,
            },
        });
    } catch (error) {
        console.log("There was an error finding the user: ", error);
    }
    
    try {
        await db.event.create({
            data: {
                name: name,
                description: description,
                organizerId: newOrganizer!.id,
                locationId: location!.id,
                startDateTime: startDateTime,
                endDateTime: endDateTime
            },
        });
    } catch (error) {
        console.log("There was an error creating the event: ", error);
    }

    revalidatePath("/events");
}

export async function getAllEvents(query: string) {

    console.log("search params: ", query);
    
    if (!query) {
        return await db.event.findMany();
    }

    try {
        const events = await db.event.findMany({
            where: {
                OR: [
                 {
                    name: {
                        contains: query,
                        mode: "insensitive"
                    }
                 },
                 {
                    description: {
                        contains: query,
                        mode: "insensitive"
                    }
                 },
                 {
                    location: {                   
                        city: {
                            contains: query,
                            mode: 'insensitive'
                        }                                 
                    }
                 },
                 {
                    location: {
                        name: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                 },
                 {
                    location: {
                        zip: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                 },
                 {
                    location: {
                        state: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                 }
                ]
            }
        });
        console.log(events);

        return events;
    } catch (err) {
        console.log("There was an error fetching events: ", err);
    }
}

export async function getLocationById(id: number | undefined) {
    try {
        const location = await db.location.findUnique({
            where: {
                id: id
            }
        })

        return {location};
    } catch (error) {
        throw new Error("Location does not exist");
    }
}

export async function getOrganizerName(id: number | undefined) {
    try {
        const organizerName = await db.user.findUnique({
            where: {
                id: id
            }
        })
        return {organizerName};
    } catch (err) {
        throw new Error("Organizer does not exist");        
    }
}

export async function getEventById(id: number) {
    try {
        const event = await db.event.findUnique({
            where: {
                id,
            }                            
        });
        return { event };
    } catch (err) {
        console.log("There was an error fetching an eveng with that id: ", err);
        return { event: null, message: "There was an error fetching event" };
    }
}
export async function addUserToEvent(eventId: number): Promise<AttendeeResponse> {
    const session = await getServerSession();
    let user;

    if (session) {
        const userFromSession = session.user;
        try {
            user = await db.user.findUnique({
                where: {
                    email: `${userFromSession.email}`,
                },
            });
        } catch (err) {
            console.log("error fetching user to create attendee record: ", err);
        }
    } else {
        console.log("session does not exist: ", session);
        return {
            status: 400,
            error: "Session for user does not exist.",
            ok: false,
            event: null
        }
    }

    const event = await db.event.findUnique({
        where: {
            id: eventId
        }
    });

    if (!event) {
        return {
            status: 400,
            error: "Event not found",
            ok: false,
            event: null
        }
    }

    const isUserAlreadyAttendingEvent = await isUserAttendingEvent(event.id);
    console.log("Is user already attending event? ", isUserAlreadyAttendingEvent);

    if (isUserAlreadyAttendingEvent.data) {
        return {
            status: 400,
            error: "User is already attending event",
            ok: false,
            event: event
        }
    } else {
        console.log("User is NOT already attending event");
    }

    console.log("event attendees: ", event.attendees);

    if (user) {
        try {
            const updateEvent = await db.event.update({
                where: {
                    id: eventId,
                },
                data: {
                    attendees: {
                        push: user.id
                    },
                },
            });
            console.log("User successfully added to event");

            revalidatePath(`/events/${event.id}`);     
            
            return {
                status: 201,
                error: null,
                ok: true,
                event: updateEvent
            };
        } catch (err) {
            console.log("There was an error updating event attendees: ", err);
            return {
                status: 400,
                error: "User is already attending the event.",
                ok: false,
                event: null
            }
        }
    } else {
        return {
            status: 400,
            error: "User with that id does not exist.",
            ok: false,
            event: null
        }
    }
}

export async function getUserFromSession() {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) {
        return {
            status: 400,
            error: "User not found",
            ok: false,
            data: null
        }
    }
    return {
        status: 200,
        error: null,
        ok: true,
        data: user
    }
}

export async function removeUserFromEvent(eventId: number) {
    const { data: user, error, status, ok } = await getUserFromSession();
    if (!user) {
        return {
            status,
            error,
            ok,
            data: null
        }
    }

    const userId = parseInt(user.id);

    const event = await db.event.findUnique({
        where: {
            id: eventId
        }
    });

    if (!event) {
        return {
            status: 400,
            error: "Event not found...",
            ok: false,
            data: null
        }
    }

    console.log("Events from remove user function on server: ", event);

    const usersAttending = event.attendees.filter(x => x === userId);

    console.log("Users attending from actions: ", usersAttending);

    await db.event.update({
        where: { id: event.id },
        data: {
            attendees: {
                set: usersAttending
            }
        }
    })

    const updatedEvent = await db.event.findUnique({
        where: {
            id: event.id
        }
    });

    console.log("Updated event after removing user: ", updatedEvent);

    revalidatePath(`/events/${event.id}`);

    return {
        status: 200,
        error: null,
        ok: true,
        data: updatedEvent
    }
}

export async function getEventsByOrganizer(email: string) {
    
    let user;

    try {
        user = await db.user.findUnique({
            where: {
                email: email
            }
        })
    } catch (error) {
        console.error(error);
        throw new Error("User not found in DB");
    }

    if (user) {
        try {
            const events = await db.event.findMany({
                where: {
                    organizerId: user.id
                }
            })
    
            return events;
    
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching events by organizer Id: ");            
        }    
    }    
}

export async function getEventsByAttendee(email: string) {
    let user;

    try {
        user = await db.user.findUnique({
            where: {
                email: email
            }
        })
    } catch (error) {
        console.error(error);
        throw new Error("Error getting user from DB");
    }

    if (user) {
        try {
            const events = await db.event.findMany({
                where: {
                    attendees: {
                        has: user.id
                    }
                }
            })

            return events;
            
        } catch(error)  {
            console.error(error);
            throw new Error("Event by attendee not found");
        }                           
    }
}

export async function isUserAttendingEvent(eventId: number) {
    const session = await getServerSession();

    const user = await db.user.findUnique({
        where: {
            email: session?.user.email!
        }
    })

    const event = await db.event.findUnique({
        where: {
            id: eventId
        },
        select: {
            id: true,
            attendees: true
        }
    });

    if (!event) {
        return {
            status: 400,
            error: "An event with that id was not found.",
            ok: false,
            data: false
        }
    }

    const indexOfUser = event.attendees.indexOf(user!.id);

    let found = true;

    if (indexOfUser <= -1) {
        found = false;
        console.log("Found equals: ", found);
    }

    console.log("Event equals: ", event);

    return {
        status: 200,
        ok: true,
        error: null,
        data: found
    }
}