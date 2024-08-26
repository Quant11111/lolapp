"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { saveSummonerAction } from "../../app/actions/saveSummoner";
import RoleSelector from "./Roles";

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
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent | string) => {
    if (e instanceof Event) e.preventDefault();
    if (!selectedRole) {
      setError("Please select a role before searching");
      return;
    }
    setError(null);
    setSearchResult(null);
    const [name, tag] = searchQuery.split("#");
    if (name && tag) {
      try {
        const response = await fetch(
          `/api/riot-search?name=${name}&tag=${tag}&role=${selectedRole}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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
          selected: false, // Add this line to set selected to false
        });
      } catch (error) {
        console.error("Error fetching or saving data:", error);
        setError("Not good...");
      }
    } else {
      setError("Please enter a valid summoner name and tag (Name#TAG)");
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <form
        onSubmit={handleSearch}
        className="mb-4 flex items-center space-x-2"
      >
        <Input
          type="text"
          placeholder="Gabysushi#EUW"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="grow"
        />
        <RoleSelector
          onRoleSelect={(role) => {
            setSelectedRole(role);
            handleSearch(role);
          }}
        />
      </form>
      {error && (
        <div className="mt-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}
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
