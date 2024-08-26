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
import { Switch } from "@/components/ui/switch";
import { ValidateButton } from "./ValidateButton";
import { toast } from "sonner";
import { Toggle } from "@/components/ui/toggle";

type Summoner = {
  id: string;
  gameName: string;
  tagLine: string;
  blacklist: boolean;
  rank: string | null;
  tier: string | null;
  selected: boolean;
  playedToday: boolean;
};

type SummonersTableProps = {
  summoners: Summoner[];
};

export function SummonersTable({
  summoners: initialSummoners,
}: SummonersTableProps) {
  const [summoners, setSummoners] = useState(initialSummoners);
  const [filterBlacklist, setFilterBlacklist] = useState(false);
  const [filterPlayedToday, setFilterPlayedToday] = useState(false);

  const updateSummonerState = async (id: string, value: boolean) => {
    try {
      setSummoners((prevSummoners) =>
        prevSummoners.map((summoner) =>
          summoner.id === id ? { ...summoner, blacklist: value } : summoner,
        ),
      );

      const response = await fetch("/api/update-summoner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, field: "blacklist", value }),
      });

      if (!response.ok) {
        throw new Error("Failed to update summoner");
      }

      await response.json();
      toast.success("Summoner updated successfully");
    } catch (error) {
      console.error("Error updating summoner:", error);
      toast.error("Failed to update summoner. Please try again.");
      // Revert the state if the API call fails
      setSummoners((prevSummoners) =>
        prevSummoners.map((summoner) =>
          summoner.id === id ? { ...summoner, blacklist: !value } : summoner,
        ),
      );
    }
  };

  const filteredSummoners = summoners.filter((summoner) => {
    if (filterBlacklist && summoner.blacklist) {
      return false;
    }
    if (filterPlayedToday && summoner.playedToday) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="mb-4 space-x-2">
        <Toggle
          pressed={!filterBlacklist}
          onPressedChange={(pressed) => setFilterBlacklist(!pressed)}
          aria-label="Toggle blacklist filter"
        >
          Blacklisted
        </Toggle>
        <Toggle
          pressed={!filterPlayedToday}
          onPressedChange={(pressed) => setFilterPlayedToday(!pressed)}
          aria-label="Toggle played today filter"
        >
          Played Today
        </Toggle>
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
                  onCheckedChange={(checked) =>
                    updateSummonerState(summoner.id, checked)
                  }
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
