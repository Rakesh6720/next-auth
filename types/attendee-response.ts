import { Event } from "@prisma/client"

export interface AttendeeResponse {
    error: string | null
    status: number
    ok: boolean
    event: Event | null
}