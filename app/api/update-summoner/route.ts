import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id, field, value } = await request.json();

    if (!id || !field || typeof value !== "boolean") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await prisma.summoner.update({
      where: { id },
      data: { [field]: value },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating summoner:", error);
    return NextResponse.json(
      { error: "Failed to update summoner" },
      { status: 500 },
    );
  }
}
