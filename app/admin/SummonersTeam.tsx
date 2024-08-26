"use client";

import { useEffect, useState } from "react";
import {
  getSummonersWithRankAndTeam,
  resetSummonerTeam,
  resetAllSummonerTeams,
} from "../actions/summonersTeam";
import { Toggle } from "@/components/ui/toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
interface Summoner {
  id: string;
  gameName: string;
  tagLine: string;
  tier: string | null;
  rank: string | null;
  team: number | null;
}

export default function SummonersTeam() {
  const [summoners, setSummoners] = useState<Summoner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTeam, setActiveTeam] = useState<1 | 2 | null>(null);

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

  const filteredSummoners = activeTeam
    ? summoners.filter((summoner) => summoner.team === activeTeam)
    : summoners.filter((summoner) => summoner.team !== null); // Only show summoners with assigned teams

  // Sort summoners by team
  const sortedSummoners = [...filteredSummoners].sort((a, b) => {
    if (a.team === null || b.team === null) return 0; // This line is now redundant but kept for safety
    return a.team - b.team;
  });

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleResetTeam = async (summonerId: string) => {
    try {
      await resetSummonerTeam(summonerId);
      toast.success("Summoner team reset successfully");
      setTimeout(handleRefresh, 300);
    } catch (err) {
      setError("Failed to reset summoner team");
      toast.error("An error occurred while resetting the summoner team");
    }
  };

  const handleResetAllTeams = async () => {
    try {
      await resetAllSummonerTeams();
      toast.success("All summoner teams reset successfully");
      setTimeout(handleRefresh, 300);
    } catch (err) {
      setError("Failed to reset all summoner teams");
      toast.error("An error occurred while resetting all summoner teams");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mb-4 space-x-2">
        <Toggle
          aria-label="Toggle Team 1 filter"
          pressed={activeTeam === 1}
          onPressedChange={() => setActiveTeam(activeTeam === 1 ? null : 1)}
        >
          Team 1
        </Toggle>
        <Toggle
          aria-label="Toggle Team 2 filter"
          pressed={activeTeam === 2}
          onPressedChange={() => setActiveTeam(activeTeam === 2 ? null : 2)}
        >
          Team 2
        </Toggle>
      </div>
      <Button onClick={handleResetAllTeams} variant="destructive">
        Reset All Teams
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Summoner</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead className="text-right">Team</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSummoners.map((summoner) => (
            <TableRow key={`${summoner.gameName}#${summoner.tagLine}`}>
              <TableCell>{`${summoner.gameName}#${summoner.tagLine}`}</TableCell>
              <TableCell>{`${summoner.tier || "Unranked"} ${summoner.rank || ""}`}</TableCell>
              <TableCell className="text-right">
                {summoner.team || "N/A"}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleResetTeam(summoner.id)}
                  disabled={summoner.team === null}
                  variant="outline"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
