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

  const handleClick = async () => {
    const newSelectedState = await toggleSummonerSelection(summonerId);
    if (newSelectedState !== null) {
      setIsSelected(newSelectedState);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded px-4 py-2 ${
        isSelected ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {isSelected ? "Selected" : "Select"}
    </button>
  );
}
