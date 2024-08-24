-- AlterTable
ALTER TABLE "Summoner" ADD COLUMN     "blacklist" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inGame" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playedToday" BOOLEAN NOT NULL DEFAULT false;
