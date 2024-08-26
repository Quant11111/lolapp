"use client";

import { useEffect, useState } from "react";
import { getSummonersWithRankAndTeam } from "../actions/summonersTeam";
import { Toggle } from "@/components/ui/toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Summoner {
  tier?: string; // Make tier optional
  gameName: string;
  tagLine: string;
  rank: string | null;
  team: number | null;
}

export default function SummonersTeam() {
  const [summoners, setSummoners] = useState<Summoner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1); // Default to Team 1

  useEffect(() => {
    async function fetchSummoners() {
      try {
        const data = await getSummonersWithRankAndTeam();
        setSummoners(data);
      } catch (err) {
        setError("Failed to fetch summoners");
      } finally {
        setLoading(false);
      }
    }

    fetchSummoners();
  }, []);

  const filteredSummoners = summoners.filter(
    (summoner) => summoner.team === activeTeam,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mb-4 space-x-2">
        <Toggle
          aria-label="Toggle Team 1 filter"
          pressed={activeTeam === 1}
          onPressedChange={() => setActiveTeam(1)}
        >
          Team 1
        </Toggle>
        <Toggle
          aria-label="Toggle Team 2 filter"
          pressed={activeTeam === 2}
          onPressedChange={() => setActiveTeam(2)}
        >
          Team 2
        </Toggle>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Summoner</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead className="text-right">Team</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSummoners.map((summoner) => (
            <TableRow key={`${summoner.gameName}#${summoner.tagLine}`}>
              <TableCell>{`${summoner.gameName}#${summoner.tagLine}`}</TableCell>
              <TableCell>{`${summoner.tier || "Unranked"} ${summoner.rank || ""}`}</TableCell>
              <TableCell className="text-right">
                {summoner.team || "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
