/*
  Warnings:

  - You are about to drop the `MembersAttendingEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MembersAttendingEvents" DROP CONSTRAINT "MembersAttendingEvents_eventId_fkey";

-- DropForeignKey
ALTER TABLE "MembersAttendingEvents" DROP CONSTRAINT "MembersAttendingEvents_userId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "attendees" INTEGER[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "eventsAttended" INTEGER[];

-- DropTable
DROP TABLE "MembersAttendingEvents";
