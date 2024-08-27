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
