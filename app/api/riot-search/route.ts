import { NextResponse } from "next/server";
import {
  AccountData,
  QueueData,
  QueueDataObject,
  SummonerData,
} from "./riotTypes";

async function fetchWithApiKey(url: string, apiKey: string) {
  const response = await fetch(url + `?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const tag = searchParams.get("tag");
  if (!name || !tag) {
    return NextResponse.json(
      { error: "Name and tag are required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    // Step 1: Get puuid
    const accountData: AccountData = await fetchWithApiKey(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
      apiKey,
    );

    // Step 2: Get summoner ID
    const summonerData: SummonerData = await fetchWithApiKey(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}`,
      apiKey,
    );

    // Step 3: Get rank information
    const queueData: QueueData = await fetchWithApiKey(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}`,
      apiKey,
    );

    // Find solo queue rank
    const soloQueueRank = queueData.find(
      (entry: QueueDataObject) => entry.queueType === "RANKED_SOLO_5x5",
    );

    // # TODO save summoner

    return NextResponse.json({
      puuid: accountData.puuid,
      gameName: accountData.gameName,
      tagLine: accountData.tagLine,
      id: summonerData.id,
      accountId: summonerData.accountId,
      profileIconId: summonerData.profileIconId,
      revisionDate: summonerData.revisionDate,
      summonerLevel: summonerData.summonerLevel,
      tier: soloQueueRank ? soloQueueRank.tier : undefined,
      rank: soloQueueRank ? soloQueueRank.rank : undefined,
    });
  } catch (error) {
    console.error("Error fetching from Riot API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Riot API" },
      { status: 500 },
    );
  }
}
