"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

const SaveButton: React.FC<SaveButtonProps> = ({ variant = "default" }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Button
      onClick={handleRefresh}
      variant={variant}
      className="animate-pulse bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-white hover:from-pink-500 hover:to-purple-500"
    >
      Save
    </Button>
  );
};

export default SaveButton;
