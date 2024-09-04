-- CreateEnum
CREATE TYPE "UserPlan" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "CustomStatus" AS ENUM ('OPEN', 'CLOSED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TOP', 'JGL', 'MID', 'BOT', 'SUP');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshTokenExpiresIn" TEXT,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "puuid" TEXT,
    "gameName" TEXT,
    "tagLine" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" TEXT,
    "plan" "UserPlan" NOT NULL DEFAULT 'FREE',
    "resendContactId" TEXT,
    "passwordHash" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "review" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "email" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Summoner" (
    "puuid" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "profileIconId" INTEGER,
    "revisionDate" BIGINT NOT NULL,
    "summonerLevel" INTEGER NOT NULL,
    "tier" TEXT,
    "rank" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstRole" "Role",
    "secondRole" "Role",
    "createdCustomIds" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Summoner_pkey" PRIMARY KEY ("puuid")
);

-- CreateTable
CREATE TABLE "Custom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "discordLink" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "CustomStatus" NOT NULL DEFAULT 'OPEN',
    "blueTopSumId" TEXT,
    "blueJglSumId" TEXT,
    "blueMidSumId" TEXT,
    "blueBotSumId" TEXT,
    "blueSupSumId" TEXT,
    "redTopSumId" TEXT,
    "redJglSumId" TEXT,
    "redMidSumId" TEXT,
    "redBotSumId" TEXT,
    "redSupSumId" TEXT,

    CONSTRAINT "Custom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FollowedSummoners" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BlackListedSummoners" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CustomCandidates" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_id_key" ON "Summoner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_accountId_key" ON "Summoner"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_userId_key" ON "Summoner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_FollowedSummoners_AB_unique" ON "_FollowedSummoners"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowedSummoners_B_index" ON "_FollowedSummoners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BlackListedSummoners_AB_unique" ON "_BlackListedSummoners"("A", "B");

-- CreateIndex
CREATE INDEX "_BlackListedSummoners_B_index" ON "_BlackListedSummoners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomCandidates_AB_unique" ON "_CustomCandidates"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomCandidates_B_index" ON "_CustomCandidates"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summoner" ADD CONSTRAINT "Summoner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Custom" ADD CONSTRAINT "Custom_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Summoner"("puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedSummoners" ADD CONSTRAINT "_FollowedSummoners_A_fkey" FOREIGN KEY ("A") REFERENCES "Summoner"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedSummoners" ADD CONSTRAINT "_FollowedSummoners_B_fkey" FOREIGN KEY ("B") REFERENCES "Summoner"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlackListedSummoners" ADD CONSTRAINT "_BlackListedSummoners_A_fkey" FOREIGN KEY ("A") REFERENCES "Summoner"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlackListedSummoners" ADD CONSTRAINT "_BlackListedSummoners_B_fkey" FOREIGN KEY ("B") REFERENCES "Summoner"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomCandidates" ADD CONSTRAINT "_CustomCandidates_A_fkey" FOREIGN KEY ("A") REFERENCES "Custom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomCandidates" ADD CONSTRAINT "_CustomCandidates_B_fkey" FOREIGN KEY ("B") REFERENCES "Summoner"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;
