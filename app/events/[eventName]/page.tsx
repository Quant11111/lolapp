import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { SummonersTable } from "./SummonersTable";
import RefreshButton from "./RefreshButton";
import { SearchBar } from "@/components/SearchBar";

export default async function EventPage({
  params,
}: PageParams<{ eventName: string }>) {
  const eventName = decodeURIComponent(params.eventName);

  // Fetch the event from the database
  const event = await prisma.event.findUnique({
    where: { name: eventName },
  });

  if (!event) {
    notFound();
  }

  const [summoners] = await Promise.all([
    prisma.summoner.findMany({
      where: {
        blacklist: false,
        selected: false,
      },
      select: {
        id: true,
        gameName: true,
        tagLine: true,
        playedToday: true,
        rank: true,
        tier: true,
        lastUpdated: true,
        selected: true,
      },
    }),
    prisma.conceptStart.findFirst({
      select: {
        updateAt: true,
      },
      orderBy: {
        id: "desc",
      },
    }),
  ]);

  // Sorting logic for summoners
  const rankOrder = [
    "CHALLENGER",
    "GRANDMASTER",
    "MASTER",
    "DIAMOND",
    "PLATINUM",
    "GOLD",
    "SILVER",
    "BRONZE",
    "IRON",
  ];
  const tierOrder = ["I", "II", "III", "IV"];

  const sortedSummoners = summoners.sort((a, b) => {
    if (a.tier === b.tier) {
      return tierOrder.indexOf(a.rank || "") - tierOrder.indexOf(b.rank || "");
    }
    return rankOrder.indexOf(a.tier || "") - rankOrder.indexOf(b.tier || "");
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{event.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="mb-8 mt-4">
        <div className="mb-4 flex justify-between">
          <div className="flex space-x-4"></div>
          <RefreshButton />
        </div>
        <SearchBar />
        <SummonersTable summoners={sortedSummoners} />
      </LayoutContent>
    </Layout>
  );
}
