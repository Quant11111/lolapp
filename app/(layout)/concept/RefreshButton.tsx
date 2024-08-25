"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function RefreshButton() {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <Button variant="secondary" onClick={handleRefresh}>
      Refresh
    </Button>
  );
}
