"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface RefreshButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  variant = "default",
}) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Button onClick={handleRefresh} variant={variant}>
      Refresh
    </Button>
  );
};

export default RefreshButton;
