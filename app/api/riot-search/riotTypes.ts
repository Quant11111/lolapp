export type AccountData = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type SummonerData = {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

export type RankedQueueData = {
  leagueId: string;
  queueType: "RANKED_SOLO_5x5";
  tier: string;
  rank: string;
  summonerId: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
};

export type CherryQueueData = {
  queueType: "CHERRY";
  summonerId: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
};

export type QueueDataObject = RankedQueueData | CherryQueueData;
export type QueueData = QueueDataObject[];
