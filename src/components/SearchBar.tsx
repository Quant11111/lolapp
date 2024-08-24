"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { saveSummonerAction } from "../../app/actions/saveSummoner";

type SearchResult = {
  gameName: string;
  tagLine: string;
  summonerLevel: number;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const [name, tag] = searchQuery.split("#");
    if (name && tag) {
      try {
        const response = await fetch(
          `/api/riot-search?name=${name}&tag=${tag}`,
        );
        const data = await response.json();
        setSearchResult(data);

        // Save the summoner data
        await saveSummonerAction({
          puuid: data.puuid,
          gameName: data.gameName,
          tagLine: data.tagLine,
          accountId: data.accountId,
          profileIconId: data.profileIconId,
          revisionDate: data.revisionDate,
          summonerLevel: data.summonerLevel,
          tier: data.tier,
          rank: data.rank,
        });
      } catch (error) {
        console.error("Error fetching or saving data:", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={handleSearch}
        className="mb-4 flex items-center space-x-2"
      >
        <Input
          type="text"
          placeholder="Search (e.g., Gabysushi#euw)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : <Search className="size-4" />}
        </Button>
      </form>
      {searchResult && (
        <div className="rounded-lg bg-card p-4 text-card-foreground shadow-md">
          <h2 className="mb-2 text-2xl font-bold">
            {searchResult.gameName}#{searchResult.tagLine}
          </h2>
          <p>Summoner Level: {searchResult.summonerLevel}</p>
          <p>Rank: {searchResult.rank}</p>
          <p>League Points: {searchResult.leaguePoints}</p>
          <p>Wins: {searchResult.wins}</p>
          <p>Losses: {searchResult.losses}</p>
        </div>
      )}
    </div>
  );
}
