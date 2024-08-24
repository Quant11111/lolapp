import { NextResponse } from 'next/server';

async function fetchWithApiKey(url: string, apiKey: string) {
  const response = await fetch(url + `?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const tag = searchParams.get('tag');

  if (!name || !tag) {
    return NextResponse.json({ error: 'Name and tag are required' }, { status: 400 });
  }

  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // Step 1: Get puuid
    const accountData = await fetchWithApiKey(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
      apiKey
    );

    // Step 2: Get summoner ID
    const summonerData = await fetchWithApiKey(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}`,
      apiKey
    );

    // Step 3: Get rank information
    const rankData = await fetchWithApiKey(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}`,
      apiKey
    );

// ... existing code ...

// Define an interface for the rank entry
interface RankEntry {
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
  }
  
  // Find solo queue rank
  const soloQueueRank = rankData.find((entry: RankEntry) => entry.queueType === "RANKED_SOLO_5x5");
  
  // ... existing code ...

    return NextResponse.json({
      gameName: accountData.gameName,
      tagLine: accountData.tagLine,
      summonerLevel: summonerData.summonerLevel,
      rank: soloQueueRank ? `${soloQueueRank.tier} ${soloQueueRank.rank}` : 'Unranked',
      leaguePoints: soloQueueRank ? soloQueueRank.leaguePoints : 0,
      wins: soloQueueRank ? soloQueueRank.wins : 0,
      losses: soloQueueRank ? soloQueueRank.losses : 0,
    });
  } catch (error) {
    console.error('Error fetching from Riot API:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Riot API' }, { status: 500 });
  }
}