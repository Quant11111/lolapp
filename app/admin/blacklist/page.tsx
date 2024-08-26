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
import { HeaderBase } from "@/features/layout/HeaderBase";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function AdminPage(props: PageParams<{}>) {
  const user = await auth();

  if (!user || !user.isAdmin) {
    redirect("/");
  }

  await Promise.all([
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

  return (
    <>
      <HeaderBase />
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Blacklist Concept</LayoutTitle>
        </LayoutHeader>

        <LayoutContent className="mb-8 mt-4">
          <div className="mb-4 flex justify-between">
            <div className="flex space-x-4">
              <Link
                href="/admin"
                className={buttonVariants({ variant: "outline" })}
              >
                Admin Page
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="w-full lg:w-3/5">
                <h2 className="mb-4 text-2xl font-bold">All Summoners</h2>
                <SummonersTable />
              </div>
            </div>
          </div>
        </LayoutContent>
      </Layout>
    </>
  );
}
