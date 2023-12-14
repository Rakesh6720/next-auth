/*
  Warnings:

  - You are about to drop the `_attendees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_attendees" DROP CONSTRAINT "_attendees_A_fkey";

-- DropForeignKey
ALTER TABLE "_attendees" DROP CONSTRAINT "_attendees_B_fkey";

-- DropTable
DROP TABLE "_attendees";

-- CreateTable
CREATE TABLE "MembersAttendingEvents" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MembersAttendingEvents_pkey" PRIMARY KEY ("userId","eventId")
);

-- AddForeignKey
ALTER TABLE "MembersAttendingEvents" ADD CONSTRAINT "MembersAttendingEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembersAttendingEvents" ADD CONSTRAINT "MembersAttendingEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
