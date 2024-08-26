"use client";

import { useState } from "react";
import { hardResetAction } from "../actions/hardResetAction";

export default function HardResetButton() {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (
      confirm(
        "Are you sure you want to reset the summoner model database? This action cannot be undone.",
      )
    ) {
      setIsResetting(true);
      try {
        await hardResetAction();
        alert("Summoner model database has been reset successfully.");
        // Add page refresh after successful reset
        window.location.reload();
      } catch (error) {
        console.error("Error resetting database:", error);
        alert(
          "An error occurred while resetting the database. Please try again.",
        );
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={isResetting}
      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
    >
      {isResetting ? "Resetting..." : "Hard Reset Summoner Database"}
    </button>
  );
}
