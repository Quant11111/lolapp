/*
  Warnings:

  - Added the required column `team` to the `Summoner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Summoner" ADD COLUMN     "team" INTEGER NOT NULL;
