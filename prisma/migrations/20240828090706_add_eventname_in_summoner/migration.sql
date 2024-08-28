/*
  Warnings:

  - A unique constraint covering the columns `[eventName]` on the table `Summoner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Summoner" ADD COLUMN     "eventName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_eventName_key" ON "Summoner"("eventName");
