import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { prisma } from "@/lib/prisma";
import { SummonersTable } from "./SummonersTable";
import { StartConceptButton } from "./StartConceptButton";
import { ConceptTimestamps } from "./ConceptTimestamps";
import RefreshButton from "./RefreshButton";

export default async function RoutePage(props: PageParams<{}>) {
  const [summoners, conceptStart] = await Promise.all([
    prisma.summoner.findMany({
      select: {
        id: true,
        gameName: true,
        tagLine: true,
        blacklist: true,
        playedToday: true,
        rank: true,
        tier: true,
        lastUpdated: true,
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

  // Filter summoners based on lastUpdated > updateAt
  const filteredSummoners = summoners.filter(
    (summoner) => conceptStart && summoner.lastUpdated > conceptStart.updateAt,
  );

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

  const sortedSummoners = filteredSummoners.sort((a, b) => {
    if (a.tier === b.tier) {
      return tierOrder.indexOf(a.rank || "") - tierOrder.indexOf(b.rank || "");
    }
    return rankOrder.indexOf(a.tier || "") - rankOrder.indexOf(b.tier || "");
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>CONCEPT</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="mb-8 mt-4">
        <ConceptTimestamps />
        <div className="mb-4 flex justify-between">
          <div className="flex space-x-4">
            <StartConceptButton />
            <Button variant="destructive">Reset</Button>
          </div>
          <RefreshButton variant="default" />
        </div>
        <SummonersTable summoners={sortedSummoners} />
      </LayoutContent>
    </Layout>
  );
}
