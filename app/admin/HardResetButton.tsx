"use client";

import { useState, useEffect } from "react";
import { hardResetAction } from "../actions/hardResetAction";

export default function HardResetButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
  } | null>(null);
  const [buttonText, setButtonText] = useState("Reset Summoners");

  useEffect(() => {
    if (result) {
      setButtonText(result.message || "");
      const timer = setTimeout(() => {
        setButtonText("Reset Summoners");
        setResult(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleReset = async () => {
    setIsLoading(true);
    try {
      const response = await hardResetAction();
      setResult(response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleReset}
        disabled={isLoading}
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        {isLoading ? "Resetting..." : buttonText}
      </button>
    </div>
  );
}
