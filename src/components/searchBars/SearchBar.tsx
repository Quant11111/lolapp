"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { saveSummonerAction } from "../../app/actions/saveSummoner";
import RoleSelector from "./Roles";
import { saveRoleAction } from "../../app/actions/saveRole"; // Add this import
import { registerSummonerToEvent } from "../../app/actions/event"; // Add this import

type SearchResult = {
  gameName: string;
  tagLine: string;
  summonerLevel: number;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  puuid: string; // Add this property
};

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null); // Add this line

  const handleSearch = async (role: string) => {
    if (!searchQuery) {
      setError("Please enter a summoner name and tag before selecting a role");
      return;
    }
    setError(null);
    setSearchResult(null);
    const [name, tag] = searchQuery.split("#");
    if (name && tag) {
      try {
        const response = await fetch(
          `/api/riot-search?name=${name}&tag=${tag}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResult(data);

        // Update the saveSummonerAction call
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
          selected: false,
        });

        // Add this after saveSummonerAction
        await saveRoleAction(data.puuid, role);

        // Add this after saveRoleAction
        const nameEvent = window.location.pathname.split("/").pop() || "";
        await registerSummonerToEvent(data.puuid, nameEvent);

        setSelectedRole(role);
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
      <div className="mb-4 flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Gabysushi#EUW"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="grow"
        />
        <RoleSelector onRoleSelect={handleSearch} />
      </div>
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
          <p>Selected Role: {selectedRole}</p>
        </div>
      )}
    </div>
  );
}
