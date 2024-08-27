/*
  Warnings:

  - You are about to drop the column `secondRole` on the `Summoner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Summoner" DROP COLUMN "secondRole",
ALTER COLUMN "firstRole" DROP DEFAULT;
