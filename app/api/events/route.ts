import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    console.log("Received event name:", name);

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Invalid event name" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();

    console.log("Prisma client:", prisma);
    console.log("Prisma event model:", prisma.event);

    if (!prisma.event) {
      throw new Error("Prisma event model is not defined");
    }

    console.log("Searching for event with name:", trimmedName);
    const existingEvent = await prisma.event.findFirst({
      where: { name: trimmedName },
    });

    console.log("Existing event search result:", existingEvent);

    if (existingEvent) {
      return NextResponse.json(
        { error: "Event with this name already exists" },
        { status: 409 },
      );
    }

    // Get the latest event to determine the next ID
    const latestEvent = await prisma.event.findFirst({
      orderBy: { id: "desc" },
    });

    const nextId = latestEvent ? parseInt(latestEvent.id) + 1 : 1;

    console.log("Creating event with name:", trimmedName);
    const event = await prisma.event.create({
      data: {
        id: nextId.toString(),
        name: trimmedName,
      },
    });

    console.log("Created event:", event);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error in event operation:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error code:", error.code);
    }
    return NextResponse.json(
      { error: "Failed to process event", details: (error as Error).message },
      { status: 500 },
    );
  }
}
