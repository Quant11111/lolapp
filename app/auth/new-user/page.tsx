import { buttonVariants } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * This page is show when a user loggin. You can add an onboarding process here.
 */
export default function NewUserPage(props: PageParams) {
  const callbackUrl =
    typeof props.searchParams.callbackUrl === "string"
      ? props.searchParams.callbackUrl
      : "/";

  redirect(callbackUrl);

  return (
    <>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Successfully login</LayoutTitle>
          <LayoutDescription>You can now use the app</LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
        </LayoutContent>
      </Layout>
    </>
  );
}
