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
import { SummonersTable } from "./SummonersTable";
import RefreshButton from "./RefreshButton";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await auth();

  console.log(
    "User authentication status:",
    user ? "Authenticated" : "Not authenticated",
  );
  console.log("User admin status:", user?.isAdmin ? "Admin" : "Not admin");

  if (!user) {
    console.log("Redirecting: User not authenticated");
    redirect("/");
  }

  if (!user.isAdmin) {
    console.log("Redirecting: User is not an admin");
    redirect("/");
  }

  console.log("Access granted: User is authenticated and an admin");

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
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Projet DECIMUS</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="mb-8 mt-4">
        <div className="mb-4 flex justify-between">
          <div className="flex space-x-4"></div>
          <RefreshButton />
        </div>
        <SummonersTable summoners={sortedSummoners} />
      </LayoutContent>
    </Layout>
  );
}
