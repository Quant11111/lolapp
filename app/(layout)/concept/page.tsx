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

export default async function RoutePage(props: PageParams<{}>) {
  const summoners = await prisma.summoner.findMany({
    select: {
      id: true,
      gameName: true,
      tagLine: true,
      blacklist: true,
      playedToday: true,
    },
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>CONCEPT</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="mb-8 mt-4">
        <div className="mb-4 flex space-x-4">
          <Button variant="outline">New Concept</Button>
          <Button variant="secondary">Refresh</Button>
          <Button variant="destructive">Reset</Button>
        </div>
        <SummonersTable summoners={summoners} />
      </LayoutContent>
    </Layout>
  );
}
