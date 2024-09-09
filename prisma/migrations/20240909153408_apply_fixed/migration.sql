/*
  Warnings:

  - You are about to drop the `_CustomCandidates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CustomCandidates" DROP CONSTRAINT "_CustomCandidates_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomCandidates" DROP CONSTRAINT "_CustomCandidates_B_fkey";

-- AlterTable
ALTER TABLE "Summoner" ADD COLUMN     "applianceId" TEXT;

-- DropTable
DROP TABLE "_CustomCandidates";

-- AddForeignKey
ALTER TABLE "Summoner" ADD CONSTRAINT "Summoner_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Custom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
