"use client";

import { Button } from "@/components/ui/button";
import { startConceptAction } from "../../actions/startconceptaction";
import { useState } from "react";
import { toast } from "sonner";

export const StartConceptButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartConcept = async () => {
    setIsLoading(true);
    try {
      const result = await startConceptAction();
      if (result) {
        if ("id" in result) {
          toast.success(`Concept started with ID: ${result.id}`);
          console.log("Attempting to refresh the page...");
          window.location.reload(); // Refresh the page
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
    }
  };
  return (
    <Button variant="outline" onClick={handleStartConcept} disabled={isLoading}>
      {isLoading ? "Starting..." : "Start Concept"}
    </Button>
  );
};
