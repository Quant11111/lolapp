"use server";

import { ActionError, authAction } from "@/lib/backend/safe-actions";
import { SummonerFormSchema } from "./edit-summoner.schema";
import { prisma } from "@/lib/prisma";
import { getServerUrl } from "@/lib/server-url";

export const editSummonerAction = authAction
  .schema(SummonerFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    const userId = ctx.user.id;
    const [name, tag] = input.name.split("#");
    if (name && tag) {
      try {
        console.log("fetching data");
        const response = await fetch(
          `${getServerUrl()}/api/riot-search?name=${name}&tag=${tag}`,
        );
        console.log("data fetched");
        const gatheredData = await response.json();

        console.log(gatheredData);

        const summoner = await prisma.summoner.upsert({
          where: { puuid: gatheredData.puuid },
          update: {
            gameName: gatheredData.gameName,
            tagLine: gatheredData.tagLine,
            id: gatheredData.id,
            accountId: gatheredData.accountId,
            profileIconId: gatheredData.profileIconId,
            revisionDate: BigInt(gatheredData.revisionDate), // Assurez-vous que revisionDate est un BigInt
            summonerLevel: gatheredData.summonerLevel,
            tier: gatheredData.tier,
            rank: gatheredData.rank,
            userId: userId, // Assurez-vous que userId est fourni et correspond à un utilisateur existant
          },
          create: {
            puuid: gatheredData.puuid,
            gameName: gatheredData.gameName,
            tagLine: gatheredData.tagLine,
            id: gatheredData.id,
            accountId: gatheredData.accountId,
            profileIconId: gatheredData.profileIconId,
            revisionDate: BigInt(gatheredData.revisionDate), // Assurez-vous que revisionDate est un BigInt
            summonerLevel: gatheredData.summonerLevel,
            tier: gatheredData.tier,
            rank: gatheredData.rank,
            userId: userId, // Assurez-vous que userId est fourni et correspond à un utilisateur existant
          },
        });
        return summoner;
      } catch (error) {
        console.error("Error fetching summoner data:", error);
        throw new ActionError("Error fetching summoner data");
      }
    } else {
      throw new ActionError("Name and tag are required");
    }
  });
