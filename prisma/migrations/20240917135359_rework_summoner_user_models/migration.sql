/*
  Warnings:

  - The primary key for the `Summoner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `applianceId` on the `Summoner` table. All the data in the column will be lost.
  - You are about to drop the column `createdCustomIds` on the `Summoner` table. All the data in the column will be lost.
  - You are about to drop the column `firstRole` on the `Summoner` table. All the data in the column will be lost.
  - You are about to drop the column `pinnedPresentation` on the `Summoner` table. All the data in the column will be lost.
  - You are about to drop the column `secondRole` on the `Summoner` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Summoner` table. All the data in the column will be lost.
  - You are about to drop the `_BlackListedSummoners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Custom" DROP CONSTRAINT "Custom_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Summoner" DROP CONSTRAINT "Summoner_applianceId_fkey";

-- DropForeignKey
ALTER TABLE "Summoner" DROP CONSTRAINT "Summoner_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BlackListedSummoners" DROP CONSTRAINT "_BlackListedSummoners_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlackListedSummoners" DROP CONSTRAINT "_BlackListedSummoners_B_fkey";

-- DropForeignKey
ALTER TABLE "_BlueTeam" DROP CONSTRAINT "_BlueTeam_B_fkey";

-- DropForeignKey
ALTER TABLE "_FollowedSummoners" DROP CONSTRAINT "_FollowedSummoners_A_fkey";

-- DropForeignKey
ALTER TABLE "_FollowedSummoners" DROP CONSTRAINT "_FollowedSummoners_B_fkey";

-- DropForeignKey
ALTER TABLE "_RedTeam" DROP CONSTRAINT "_RedTeam_B_fkey";

-- DropIndex
DROP INDEX "Summoner_accountId_key";

-- DropIndex
DROP INDEX "Summoner_id_key";

-- DropIndex
DROP INDEX "Summoner_userId_key";

-- AlterTable
ALTER TABLE "Summoner" DROP CONSTRAINT "Summoner_pkey",
DROP COLUMN "applianceId",
DROP COLUMN "createdCustomIds",
DROP COLUMN "firstRole",
DROP COLUMN "pinnedPresentation",
DROP COLUMN "secondRole",
DROP COLUMN "updatedAt",
ADD CONSTRAINT "Summoner_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "applianceId" TEXT,
ADD COLUMN     "createdCustomIds" TEXT[],
ADD COLUMN     "firstRole" "Role",
ADD COLUMN     "pinnedPresentation" TEXT,
ADD COLUMN     "secondRole" "Role";

-- DropTable
DROP TABLE "_BlackListedSummoners";

-- CreateTable
CREATE TABLE "_BlackListedUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlackListedUser_AB_unique" ON "_BlackListedUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BlackListedUser_B_index" ON "_BlackListedUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Custom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summoner" ADD CONSTRAINT "Summoner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Custom" ADD CONSTRAINT "Custom_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedSummoners" ADD CONSTRAINT "_FollowedSummoners_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedSummoners" ADD CONSTRAINT "_FollowedSummoners_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlackListedUser" ADD CONSTRAINT "_BlackListedUser_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlackListedUser" ADD CONSTRAINT "_BlackListedUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlueTeam" ADD CONSTRAINT "_BlueTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RedTeam" ADD CONSTRAINT "_RedTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
