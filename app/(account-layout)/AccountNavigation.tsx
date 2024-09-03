import { Separator } from "@/components/ui/separator";
import { Layout } from "@/features/page/layout";
import type { PropsWithChildren } from "react";
import { DesktopVerticalMenu } from "../../src/features/navigation/DesktopVerticalMenu";
import { ACCOUNT_LINKS } from "./account-links";

export const AccountNavigation = async (props: PropsWithChildren) => {
  return (
    <Layout className="flex h-full flex-row items-start justify-center gap-4 rounded-xl border-2 px-4 pt-4">
      <DesktopVerticalMenu links={ACCOUNT_LINKS} className="max-lg:hidden" />
      <Separator className="max-lg:hidden" orientation="vertical" />
      <main className="relative h-full max-h-full flex-1 overflow-scroll pb-8 pr-8">
        {props.children}
      </main>
    </Layout>
  );
};
