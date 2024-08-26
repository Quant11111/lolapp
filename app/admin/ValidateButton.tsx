"use client";

import { useState } from "react";
import { toggleSummonerTeam } from "../actions/validateButton";

interface ValidateButtonProps {
  summonerId: string;
  initialTeam: number | null;
}

export function ValidateButton({
  summonerId,
  initialTeam,
}: ValidateButtonProps) {
  const [team, setTeam] = useState<number | null>(initialTeam);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const newTeam = await toggleSummonerTeam(summonerId);
      setTeam(newTeam);
    } catch (error) {
      console.error("Error in handleClick:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Updating...";
    switch (team) {
      case null:
        return "Unassigned";
      case 1:
        return "Team 1";
      case 2:
        return "Team 2";
      default:
        return "Error";
    }
  };

  const getButtonColor = () => {
    switch (team) {
      case null:
        return "bg-gray-200 text-gray-800";
      case 1:
        return "bg-blue-500 text-white";
      case 2:
        return "bg-red-500 text-white";
      default:
        return "bg-yellow-500 text-black";
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded px-4 py-2 ${getButtonColor()}`}
      disabled={isLoading}
    >
      {getButtonText()}
    </button>
  );
}
