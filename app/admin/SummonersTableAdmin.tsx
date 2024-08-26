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
import { ValidateButton } from "./ValidateButton";
import { Toggle } from "@/components/ui/toggle";
import { getSummonersWithRankAndTeam } from "../actions/summonersTeam";
import SaveButton from "./SaveButton";

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
              blacklist: false,
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
      if (filterBlacklist && summoner.blacklist) return false;
      if (filterPlayedToday && summoner.playedToday) return false;
      return summoner.team === null;
    });
  }, [summoners, filterBlacklist, filterPlayedToday]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mb-4 space-x-2">
        <Toggle
          pressed={!filterBlacklist}
          onPressedChange={(pressed: unknown) => setFilterBlacklist(!pressed)}
          aria-label="Toggle blacklist filter"
        >
          Blacklisted
        </Toggle>
        <Toggle
          pressed={!filterPlayedToday}
          onPressedChange={(pressed: unknown) => setFilterPlayedToday(!pressed)}
          aria-label="Toggle played today filter"
        >
          Played Today
        </Toggle>
        <SaveButton />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Summoner</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Blacklist</TableHead>
            <TableHead>Actions</TableHead>
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
                  onCheckedChange={(checked) => {
                    setSummoners((prevSummoners) =>
                      prevSummoners.map((s) =>
                        s.id === summoner.id ? { ...s, blacklist: checked } : s,
                      ),
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <ValidateButton
                  summonerId={summoner.id}
                  initialTeam={summoner.selected ? 1 : 0}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
