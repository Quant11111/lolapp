import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { PostCard } from "../../../src/features/posts/PostCard";
import { getPosts } from "../../../src/features/posts/post-manager";

export default async function RoutePage(props: PageParams<{}>) {
  const posts = await getPosts();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>CONCEPT</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="mb-8 mt-4">
        <Button variant="outline">New Concept</Button>
      </LayoutContent>
    </Layout>
  );
}
