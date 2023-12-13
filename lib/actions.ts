"use server"

import { db } from "./db"

export async function createEvent(data: any) {
    const { name, date, organizer, locationName, buildingNo, street, city, state, zip } = data;

    let location;
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

    let newLocation;
    try {
        newLocation = await db.location.findFirst({
            where: {
                name: locationName
            }
        });
    } catch (error) {
        console.log("There was an error fetching the location details: ", error);
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
                organizerId: newOrganizer!.id,
                locationId: newLocation!.id,
                date: date
            }
        });
    } catch (error) {
        console.log("There was an error creating the event: ", error);
    }

    return { event };
}