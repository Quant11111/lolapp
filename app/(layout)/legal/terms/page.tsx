import { Typography } from "@/components/ui/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { MDXRemote } from "next-mdx-remote-client/rsc";

const markdown = `PADELU is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc`;

export default function page() {
  return (
    <div>
      <div className="flex w-full items-center justify-center p-8 lg:p-12">
        <Typography variant="h1">Terms</Typography>
      </div>
      <Layout>
        <LayoutContent className=" m-auto mb-8 ">
          <MDXRemote source={markdown} />
        </LayoutContent>
      </Layout>
    </div>
  );
}
