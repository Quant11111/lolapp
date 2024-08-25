import { auth } from "@/lib/auth/helper";
import { redirect } from "next/navigation";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { prisma } from "@/lib/prisma";
import { SummonersTable } from "./SummonersTableAdmin";
import { SummonersTableTeam } from "./SummonersTableTeam";
import { StartConceptButton } from "./StartConceptButton";
import { ConceptTimestamps } from "./ConceptTimestamps";
import RefreshButton from "./RefreshButton";
import { ResetConceptButton } from "./ResetConceptButton";
import { HeaderBase } from "@/features/layout/HeaderBase";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function AdminPage(props: PageParams<{}>) {
  const user = await auth();

  if (!user || !user.isAdmin) {
    redirect("/");
  }

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

  // Filter summoners based on lastUpdated > updateAt
  const filteredSummoners = summoners.filter(
    (summoner) =>
      !conceptStart?.updateAt || summoner.lastUpdated > conceptStart.updateAt,
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
    <>
      <HeaderBase />
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Admin Page Concept</LayoutTitle>
        </LayoutHeader>

        <LayoutContent className="mb-8 mt-4">
          <ConceptTimestamps />
          <div className="mb-4 flex justify-between">
            <div className="flex space-x-4">
              <StartConceptButton />
              <ResetConceptButton />
              <Link
                href="/admin/blacklist"
                className={buttonVariants({ variant: "outline" })}
              >
                Blacklist
              </Link>
            </div>
            <RefreshButton />
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="w-full md:w-1/2">
                <h2 className="mb-4 text-2xl font-bold">All Summoners</h2>
                <SummonersTable summoners={sortedSummoners} />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="mb-4 text-2xl font-bold">Selected Team</h2>
                <SummonersTableTeam summoners={sortedSummoners} />
              </div>
            </div>
          </div>
        </LayoutContent>
      </Layout>
    </>
  );
}
