/*
  Warnings:

  - Changed the type of `endTime` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTime` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMPTZ NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMPTZ NOT NULL;
