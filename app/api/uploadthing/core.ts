import { getUserFromSession } from "@/lib/actions";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({image: {maxFileSize: "4MB"}})
        .middleware(async ({req}) => {
            const {data: user} = await getUserFromSession();
            if (!user) throw new Error("Unauthorized");

            return {userId: user.id}
        })
        .onUploadComplete(async ({metadata, file}) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId, fileURL: file.url}
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;