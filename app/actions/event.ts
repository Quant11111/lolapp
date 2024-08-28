"use server";

import { prisma } from "@/lib/prisma";

export async function getLastTenEvents() {
  try {
    const events = await prisma.event.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true, // Assuming you have a title field, adjust if needed
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching last 10 events:", error);
    throw new Error("Failed to fetch events");
  }
}

export async function registerSummonerToEvent(
  puuid: string,
  nameEvent: string,
) {
  if (typeof window !== "undefined") {
    throw new Error("This function can only be called from the server side");
  }

  try {
    const updatedSummoner = await prisma.summoner.update({
      where: { puuid: puuid },
      data: { eventName: nameEvent },
    });
    return updatedSummoner;
  } catch (error) {
    console.error("Error registering summoner to event:", error);
    throw new Error("Failed to register summoner to event");
  }
}
