/*
  Warnings:

  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventName` on the `Summoner` table. All the data in the column will be lost.
  - You are about to drop the `ConceptStart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('OPEN', 'CLOSED', 'CANCELED');

-- DropIndex
DROP INDEX "Event_name_key";

-- DropIndex
DROP INDEX "Summoner_eventName_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "name",
ADD COLUMN     "blueBotSumId" TEXT,
ADD COLUMN     "blueJglSumId" TEXT,
ADD COLUMN     "blueMidSumId" TEXT,
ADD COLUMN     "blueSupSumId" TEXT,
ADD COLUMN     "blueTopSumId" TEXT,
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "discordLink" TEXT,
ADD COLUMN     "redBotSumId" TEXT,
ADD COLUMN     "redJglSumId" TEXT,
ADD COLUMN     "redMidSumId" TEXT,
ADD COLUMN     "redSupSumId" TEXT,
ADD COLUMN     "redTopSumId" TEXT,
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Summoner" DROP COLUMN "eventName";

-- DropTable
DROP TABLE "ConceptStart";

-- CreateTable
CREATE TABLE "_EventCandidates" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventCandidates_AB_unique" ON "_EventCandidates"("A", "B");

-- CreateIndex
CREATE INDEX "_EventCandidates_B_index" ON "_EventCandidates"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Summoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventCandidates" ADD CONSTRAINT "_EventCandidates_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventCandidates" ADD CONSTRAINT "_EventCandidates_B_fkey" FOREIGN KEY ("B") REFERENCES "Summoner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
