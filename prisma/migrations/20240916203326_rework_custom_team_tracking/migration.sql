/*
  Warnings:

  - You are about to drop the column `blueBotSumId` on the `Custom` table. All the data in the column will be lost.
  - You are about to drop the column `blueJglSumId` on the `Custom` table. All the data in the column will be lost.
  - You are about to drop the column `blueMidSumId` on the `Custom` table. All the data in the column will be lost.
  - You are about to drop the column `blueSupSumId` on the `Custom` table. All the data in the column will be lost.
  - You are about to drop the column `blueTopSumId` on the `Custom` table. All the data in the column will be lost.
  - You are about to drop the column `redBotSumId` on the `Custom` table. All the data in the column will be lost.
  - You are about to drop the column `redJglSumId` on the `Custom` table. All the data in the column will be lost.
  - You are about to drop the column `redMidSumId` on the `Custom` table. All the data in the column will be lost.
  - You are about to drop the column `redSupSumId` on the `Custom` table. All the data in the column will be lost.
  - You are about to drop the column `redTopSumId` on the `Custom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Custom" DROP COLUMN "blueBotSumId",
DROP COLUMN "blueJglSumId",
DROP COLUMN "blueMidSumId",
DROP COLUMN "blueSupSumId",
DROP COLUMN "blueTopSumId",
DROP COLUMN "redBotSumId",
DROP COLUMN "redJglSumId",
DROP COLUMN "redMidSumId",
DROP COLUMN "redSupSumId",
DROP COLUMN "redTopSumId";

-- CreateTable
CREATE TABLE "_BlueTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RedTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlueTeam_AB_unique" ON "_BlueTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_BlueTeam_B_index" ON "_BlueTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RedTeam_AB_unique" ON "_RedTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_RedTeam_B_index" ON "_RedTeam"("B");

-- AddForeignKey
ALTER TABLE "_BlueTeam" ADD CONSTRAINT "_BlueTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Custom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlueTeam" ADD CONSTRAINT "_BlueTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Summoner"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RedTeam" ADD CONSTRAINT "_RedTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Custom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RedTeam" ADD CONSTRAINT "_RedTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Summoner"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;
