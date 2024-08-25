-- AlterTable
ALTER TABLE "Summoner" ADD COLUMN     "selected" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "lastUpdated" DROP DEFAULT;
