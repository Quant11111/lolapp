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

  return (
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
  );
}
