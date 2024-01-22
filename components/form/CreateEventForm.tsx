"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createEvent } from "@/lib/actions";
import { Event } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
    name: z.string(),
    startDateTime: z.string(),
    endDateTime: z.string(),
    description: z.string(),    
    organizer: z.string(),
    locationName: z.string(),
    buildingNo: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string()
})

function CreateEventForm({ session }: { session: Session }) {
    const [imageURL, setImageURL] = useState("");
    const {toast} = useToast();
    const [dateError, setDateError] = useState(false);
    const router = useRouter();
    const user = session.user;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            startDateTime: new Date(Date.now()).toLocaleDateString(),
            organizer: user.email!
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        console.log("Values: ", values);

        if (new Date(values.startDateTime) < new Date(Date.now())) {
            console.log("Event cannot begin before today");
            setDateError(true);
            toast({
                title: "Error",
                description: "Event cannot occur prior to today",
                variant: "destructive"
            })
            return;
        }

        if (new Date(values.endDateTime) < new Date(values.startDateTime)) {
            console.log("Event cannot end before it begins");
            setDateError(true);
            toast({
                title: "Error",
                description: "Event cannot end before it begins",
                variant: "destructive"
            })
            return;
        }

        try {
            await createEvent(values);
            router.push("/events");
        } catch (error) {
            console.log("Error creating event: ", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-5 px-10 mt-[5rem]">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Name:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />                    
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />                               
                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Time:</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="organizer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organizer Email:</FormLabel>
                                <FormControl>
                                    <Input placeholder={user.email!} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="picture"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Picture:</FormLabel>
                                <FormControl>
                                    <Input type="file" id="picture" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    {/* <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: any) => {
                            // Do something with the response
                            console.log("Files: ", res[0].url);
                            setImageURL(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    /> */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Type your message here." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="locationName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location Name:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="buildingNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Building Number:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Street Address:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form >
    )
}

export default CreateEventForm