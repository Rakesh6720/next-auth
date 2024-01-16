"use client";

import { Session } from 'next-auth'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { uploadFiles, useUploadThing } from '@/utils/uploadthing';

interface IFormInput {
    name: string,
    description: string,
    organizer: string,
    locationName: string,
    buildingNo: string,
    street: string,
    city: string,
    state: string,
    zip: string,
}

export default function CreateEventForm2({session}: {session: Session}) {
    const user = session.user;
    const {register, handleSubmit} = useForm<IFormInput>();
    const {startUpload} = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            console.log(res);
        },
        onUploadError: () => {
            alert("error occurred while uploading");
          },
          onUploadBegin: () => {
            console.log("upload has begun");
          },
    })
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const files = [data.image];
        const res = await uploadFiles("imageUploader", {files})
        console.log(res);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <label>Event Name</label>
        <input {...register("name")}/>
        <label>Description</label>
        <input type="textarea" {...register("description")}/>
        <label>Location Name</label>
        <input {...register("locationName")}/>
        <label>Building No.</label>
        <input {...register("buildingNo")}/>
        <label>Street</label>
        <input {...register("street")}/>
        <label>City</label>
        <input {...register("city")}/>
        <label>State</label>
        <input {...register("state")}/>
        <label>Zip</label>
        <input {...register("zip")}/>
        <input type="submit"/>
    </form>
  )
}
