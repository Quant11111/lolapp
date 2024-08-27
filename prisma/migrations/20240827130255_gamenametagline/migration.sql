/*
  Warnings:

  - A unique constraint covering the columns `[gameName,tagLine]` on the table `Summoner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Summoner_gameName_tagLine_key" ON "Summoner"("gameName", "tagLine");
