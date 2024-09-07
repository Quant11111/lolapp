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
import { getSummonersWithRankAndTeam } from "../actions/summonersTeam";
import SaveButton from "./SaveButton";
import { updateSummonerBlacklist } from "../actions/summonersTeam";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Summoner = {
  id: string;
  gameName: string;
  tagLine: string;
  blacklist: boolean;
  rank: string | null;
  tier: string | null;
  selected: boolean;
  team: number | null;
  firstRole: string | null;
};

const getRoleImagePath = (role: string | null): string => {
  switch (role?.toLowerCase()) {
    case "top":
      return "/images/roles/top.png";
    case "jungle":
      return "/images/roles/jungle.png";
    case "mid":
      return "/images/roles/middle.png";
    case "adc":
      return "/images/roles/adc.png";
    case "supp":
      return "/images/roles/supp.png";
    default:
      return "/images/roles/unknown.png";
  }
};

const roleOrder = ["top", "jungle", "mid", "adc", "support"];
const rankOrder = [
  "CHALLENGER",
  "GRANDMASTER",
  "MASTER",
  "DIAMOND",
  "PLATINUM",
  "GOLD",
  "SILVER",
  "BRONZE",
  "IRON",
];

const tierOrder = ["I", "II", "III", "IV"];

export function SummonersTable() {
  const [summoners, setSummoners] = useState<Summoner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rankFilter, setRankFilter] = useState<string | null>(null);

  const fetchSummoners = async () => {
    try {
      const data = await getSummonersWithRankAndTeam();
      setSummoners(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch summoners");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummoners();
  }, []);

  const cycleRankFilter = () => {
    const currentIndex = rankFilter ? rankOrder.indexOf(rankFilter) : -1;
    const nextIndex = (currentIndex + 1) % rankOrder.length;
    setRankFilter(rankOrder[nextIndex]);
  };

  const filteredSummoners = useMemo(() => {
    return summoners.filter((summoner) => {
      const passesBasicFilter = !summoner.selected && !summoner.blacklist;
      const passesRankFilter = !rankFilter || summoner.tier === rankFilter;
      return passesBasicFilter && passesRankFilter;
    });
  }, [summoners, rankFilter]);

  const sortedSummoners = useMemo(() => {
    return filteredSummoners.sort((a, b) => {
      // Sort by role
      const roleA = roleOrder.indexOf(a.firstRole?.toLowerCase() || "");
      const roleB = roleOrder.indexOf(b.firstRole?.toLowerCase() || "");
      if (roleA !== roleB) {
        return roleA - roleB;
      }

      // If same role, sort by rank
      if (a.tier !== b.tier) {
        return (
          rankOrder.indexOf(a.tier || "") - rankOrder.indexOf(b.tier || "")
        );
      }

      // If same tier, sort by rank (I, II, III, IV)
      if (a.rank !== b.rank) {
        return (
          tierOrder.indexOf(a.rank || "") - tierOrder.indexOf(b.rank || "")
        );
      }

      // If everything is equal, maintain original order
      return 0;
    });
  }, [filteredSummoners]);

  const handleBlacklistToggle = async (
    summonerId: string,
    checked: boolean,
  ) => {
    try {
      await updateSummonerBlacklist(summonerId, checked);
      await fetchSummoners(); // Fetch updated data after toggling blacklist
    } catch (error) {
      console.error("Failed to update blacklist:", error);
      // Optionally, you can set an error state here to show a message to the user
    }
  };

  const handleSummonerClick = (gameName: string, tagLine: string) => {
    const opggUrl = `https://www.op.gg/summoners/euw/${gameName}-${tagLine}`;
    window.open(opggUrl, "_blank");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <SaveButton />

      <div className="mb-4">
        <Button onClick={cycleRankFilter} variant="outline">
          {rankFilter || "All Ranks"}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Summoner</TableHead>
            <TableHead>Rank {rankFilter ? `(${rankFilter})` : ""}</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Blacklist</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSummoners.map((summoner) => (
            <TableRow key={summoner.id}>
              <TableCell>
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    handleSummonerClick(summoner.gameName, summoner.tagLine)
                  }
                >
                  {`${summoner.gameName}#${summoner.tagLine}`}
                </span>
              </TableCell>
              <TableCell>{`${summoner.tier || "Unranked"} ${summoner.rank || ""}`}</TableCell>
              <TableCell>
                {summoner.firstRole ? (
                  <Image
                    src={getRoleImagePath(summoner.firstRole)}
                    alt={summoner.firstRole}
                    width={24}
                    height={24}
                  />
                ) : (
                  "Not set"
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={summoner.blacklist}
                  onCheckedChange={(checked) =>
                    handleBlacklistToggle(summoner.id, checked)
                  }
                />
              </TableCell>
              <TableCell>
                <ValidateButton
                  summonerId={summoner.id}
                  initialTeam={summoner.team || 0}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
