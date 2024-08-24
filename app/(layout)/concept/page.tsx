import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { PostCard } from "../../../src/features/posts/PostCard";
import {
  getPosts,
  getPostsTags,
} from "../../../src/features/posts/post-manager";

const getTags = (
  params: string | string[] | undefined,
): string[] | undefined => {
  if (Array.isArray(params)) {
    return params;
  }
  if (typeof params === "string") {
    return [params];
  }
  return undefined;
};

export default async function RoutePage(props: PageParams<{}>) {
  const activeTags = getTags(props.searchParams.tag);
  const tags = await getPostsTags();
  const posts = await getPosts(activeTags);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>CONCEPT</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={{
              pathname: "/posts",
              query: {
                tag: tag,
              },
            }}
          >
            <Badge variant={activeTags?.includes(tag) ? "default" : "outline"}>
              {tag}
            </Badge>
          </Link>
        ))}
      </LayoutContent>

      <LayoutContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </LayoutContent>
    </Layout>
  );
}
