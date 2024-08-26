import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { prisma } from "@/lib/prisma";
import { SummonersTable } from "./SummonersTable";
import { ConceptTimestamps } from "./ConceptTimestamps";
import RefreshButton from "./RefreshButton";

export default async function RoutePage(props: PageParams<{}>) {
  const [summoners] = await Promise.all([
    prisma.summoner.findMany({
      where: {
        blacklist: false,
        selected: false, // Add this line to filter out selected summoners
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

  // Remove filtered summoners logic

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
        <LayoutTitle>Projet DECIMUS</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="mb-8 mt-4">
        <ConceptTimestamps />
        <div className="mb-4 flex justify-between">
          <div className="flex space-x-4"></div>
          <RefreshButton />
        </div>
        <SummonersTable summoners={sortedSummoners} />
      </LayoutContent>
    </Layout>
  );
}
