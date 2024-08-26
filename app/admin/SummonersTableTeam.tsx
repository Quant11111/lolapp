"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";

type Summoner = {
  id: string;
  gameName: string;
  tagLine: string;
  blacklist: boolean;
  rank: string | null;
  tier: string | null;
  selected: boolean;
};

type SummonersTableTeamProps = {
  summoners: Summoner[];
};

export function SummonersTableTeam({
  summoners: initialSummoners,
}: SummonersTableTeamProps) {
  const [summoners] = useState(initialSummoners.filter((s) => s.selected));
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1);

  const handleTeamToggle = (team: 1 | 2) => {
    setActiveTeam(team);
  };

  return (
    <>
      <div className="mb-4 space-x-2">
        <Toggle
          pressed={activeTeam === 1}
          onPressedChange={() => handleTeamToggle(1)}
          aria-label="Toggle Team 1 filter"
        >
          Team 1
        </Toggle>
        <Toggle
          pressed={activeTeam === 2}
          onPressedChange={() => handleTeamToggle(2)}
          aria-label="Toggle Team 2 filter"
        >
          Team 2
        </Toggle>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Summoner</TableHead>
            <TableHead>Rank</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summoners.map((summoner) => (
            <TableRow key={summoner.id}>
              <TableCell>{`${summoner.gameName}#${summoner.tagLine}`}</TableCell>
              <TableCell>{`${summoner.tier || "Unranked"} ${summoner.rank || ""}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
