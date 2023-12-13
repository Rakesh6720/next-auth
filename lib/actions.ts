"use server"

import { db } from "./db"

export async function createEvent(data: any) {
    const { name, date, imageURL, organizer, locationName, buildingNo, street, city, state, zip } = data;

    const existingLocation = await db.location.findFirst({
        where: {
            name: locationName
        }
    })

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
                    zip: zip
                }
            });
        } catch (error) {
            console.log("There was an error creating the location: ", error);
        }
    } else {
        try {
            location = await db.location.findFirst({
                where: {
                    name: locationName
                }
            });
        } catch (error) {
            console.log("There was an error fetching the location details: ", error);
        }
    }

    let newOrganizer;
    try {
        newOrganizer = await db.user.findUnique({
            where: {
                email: organizer
            }
        });
    } catch (error) {
        console.log("There was an error finding the user: ", error);
    }

    let event;
    try {
        event = await db.event.create({
            data: {
                name: name,
                imageURL: imageURL,
                organizerId: newOrganizer!.id,
                locationId: location!.id,
                date: date
            }
        });
    } catch (error) {
        console.log("There was an error creating the event: ", error);
    }

    return { event };
}

export async function getAllEvents() {
    try {
        const events = await db.event.findMany();
        return events;
    } catch (err) {
        console.log("There was an error fetching events: ", err)
    }

}

export async function getEventById(id: number) {
    try {
        const event = await db.event.findUnique({
            where: {
                id
            }
        })
        return { event }
    } catch (err) {
        console.log("There was an error fetching an eveng with that id: ", err);
        return { event: null, message: "There was an error fetching event" }
    }
}