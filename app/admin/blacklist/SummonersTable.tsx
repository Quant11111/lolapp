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
  rank: string | null;
  tier: string | null;
};

type SummonersTableProps = {
  summoners: Summoner[];
};

export function SummonersTable({
  summoners: initialSummoners,
}: SummonersTableProps) {
  const [summoners] = useState(initialSummoners);

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
