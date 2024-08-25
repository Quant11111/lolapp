"use client";

import { Button } from "@/components/ui/button";
import { startConceptAction } from "../../actions/startconceptaction";
import { useState } from "react";
import { toast } from "sonner";
import { enqueueDialog } from "@/features/dialogs-provider/DialogProvider";

export const StartConceptButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleStartConcept = async () => {
    setIsLoading(true);
    try {
      const result = await startConceptAction();
      if (result) {
        if ("id" in result) {
          toast.success(`Concept started with ID: ${result.id}`);
        } else {
          console.log("Unexpected result structure:", result);
          toast.success("Concept started successfully");
        }
      } else {
        toast.error("No result returned from startConceptAction");
      }
    } catch (error) {
      console.error("Error in handleStartConcept:", error);
      toast.error("An error occurred while starting the concept");
    } finally {
      setIsLoading(false);
      setTimeout(handleRefresh, 300);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={() => {
        enqueueDialog({
          title: "Start a new concept",
          description: "Are you sure you want to start a new concept?",
          action: {
            label: "Start",
            onClick: handleStartConcept,
          },
        });
      }}
      disabled={isLoading}
    >
      {isLoading ? "Starting..." : "Start Concept"}
    </Button>
  );
};
