"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function CreateEvent() {
  const router = useRouter();
  const [isNaming, setIsNaming] = useState(false);
  const [eventName, setEventName] = useState("");
  const { data: session } = useSession();

  const handleCreateEventClick = () => {
    if (!session) {
      toast.error("You need to sign in first");
      return;
    }
    setIsNaming(true);
  };
  const handleSubmit = async () => {
    if (!session) {
      toast.error("Please sign in to create an event");
      return;
    }

    if (eventName.trim() !== "") {
      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: eventName.trim() }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsNaming(false);
          setEventName("");
          toast.success("Event created successfully");
          router.push(`/events/${encodeURIComponent(data.name)}`);
        } else {
          toast.error(`Failed to create event: ${data.error}`);
        }
      } catch (error) {
        console.error("Error creating event:", error);
        toast.error("An error occurred while creating the event");
      }
    }
  };

  return (
    <div className="mt-4">
      {isNaming ? (
        <div className="flex">
          <Input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
            className="rounded-l-md"
          />
          <Button
            onClick={handleSubmit}
            className="rounded-r-md"
            disabled={!session}
          >
            Submit
          </Button>
        </div>
      ) : (
        <Button onClick={handleCreateEventClick} className="w-full">
          Create Event
        </Button>
      )}
    </div>
  );
}

export default CreateEvent;
