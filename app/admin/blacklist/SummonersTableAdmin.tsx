"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import {
  getSummonersWithRankAndTeam,
  updateSummonerBlacklist,
} from "../../actions/summonersTeam";

type Summoner = {
  id: string;
  gameName: string;
  tagLine: string;
  blacklist: boolean;
  rank: string | null;
  tier: string | null;
  selected: boolean;
  playedToday: boolean;
  team: number | null;
};

export function SummonersTable() {
  const [summoners, setSummoners] = useState<Summoner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterBlacklist, setFilterBlacklist] = useState(false);
  const [filterPlayedToday, setFilterPlayedToday] = useState(false);

  useEffect(() => {
    async function fetchSummoners() {
      try {
        const data = await getSummonersWithRankAndTeam();
        setSummoners(
          data
            .filter((summoner) => summoner.team === null)
            .map((s) => ({
              ...s,
              blacklist: s.blacklist || false, // Use the existing blacklist value or default to false
              selected: false,
              playedToday: false,
            })),
        );
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch summoners");
        setLoading(false);
      }
    }

    fetchSummoners();
  }, []);

  const filteredSummoners = useMemo(() => {
    return summoners.filter((summoner) => {
      return summoner.blacklist === true;
    });
  }, [summoners]);

  const handleBlacklistToggle = async (
    summonerId: string,
    checked: boolean,
  ) => {
    try {
      await updateSummonerBlacklist(summonerId, checked);
      setSummoners((prevSummoners) =>
        prevSummoners.map((s) =>
          s.id === summonerId ? { ...s, blacklist: checked } : s,
        ),
      );
    } catch (error) {
      console.error("Failed to update blacklist status:", error);
      // Optionally, you can set an error state here to show a message to the user
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Blacklisted Summoner</TableHead>
          <TableHead>Rank</TableHead>
          <TableHead>Remove from Blacklist</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredSummoners.map((summoner) => (
          <TableRow key={summoner.id}>
            <TableCell>{`${summoner.gameName}#${summoner.tagLine}`}</TableCell>
            <TableCell>{`${summoner.tier || "Unranked"} ${summoner.rank || ""}`}</TableCell>
            <TableCell>
              <Switch
                checked={summoner.blacklist}
                onCheckedChange={(checked) =>
                  handleBlacklistToggle(summoner.id, checked)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
