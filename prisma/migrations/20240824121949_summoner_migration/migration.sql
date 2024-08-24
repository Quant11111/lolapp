-- CreateTable
CREATE TABLE "Summoner" (
    "id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" INTEGER NOT NULL,
    "summonerLevel" INTEGER NOT NULL,

    CONSTRAINT "Summoner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_puuid_key" ON "Summoner"("puuid");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_accountId_key" ON "Summoner"("accountId");
