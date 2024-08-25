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
      if (result && "id" in result) {
        toast.success(`Concept started with ID: ${result.id}`);
      } else if (result && "error" in result) {
        toast.error((result && "error" in result) || "Failed to start concept");
      } else {
        toast.error("Unexpected result");
      }
    } catch (error) {
      toast.error("An error occurred");
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
