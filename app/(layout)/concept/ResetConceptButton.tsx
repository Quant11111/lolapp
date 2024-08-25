"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { resetConceptAction } from "../../actions/resetConceptAction";
import { toast } from "sonner";
import { enqueueDialog } from "@/features/dialogs-provider/DialogProvider";

export const ResetConceptButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleResetConcept = async () => {
    setIsLoading(true);
    try {
      const result = await resetConceptAction();
      if (result?.data?.success) {
        toast.success("Concept reset successfully");
      } else {
        toast.error(result?.data?.error || "Failed to reset concept");
      }
    } catch (error) {
      console.error("Error in handleResetConcept:", error);
      toast.error("An error occurred while resetting the concept");
    } finally {
      setIsLoading(false);
      setTimeout(handleRefresh, 300);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={() => {
        enqueueDialog({
          title: "Reset concept",
          description:
            "Are you sure you want to reset the concept? This action cannot be undone.",
          action: {
            label: "Reset",
            onClick: handleResetConcept,
          },
        });
      }}
      disabled={isLoading}
    >
      {isLoading ? "Resetting..." : "Reset"}
    </Button>
  );
};
