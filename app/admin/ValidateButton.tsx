"use client";

import { useState } from "react";
import { toggleSummonerSelection } from "../actions/validateButton";

interface ValidateButtonProps {
  summonerId: string;
  initialSelected: boolean;
}

export function ValidateButton({
  summonerId,
  initialSelected,
}: ValidateButtonProps) {
  const [isSelected, setIsSelected] = useState(initialSelected);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const newSelectedState = await toggleSummonerSelection(summonerId);
      if (newSelectedState !== null) {
        setIsSelected(newSelectedState);
      }
    } catch (error) {
      console.error("Error in handleClick:", error);
    } finally {
      setIsLoading(false);
      setTimeout(handleRefresh, 300);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded px-4 py-2 ${
        isSelected ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Updating..." : isSelected ? "Selected" : "Select"}
    </button>
  );
}
