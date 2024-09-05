import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCustomAction } from "./get-customs-action";
import { findSummonerNameByIdAction } from "./find-summoner-name-by-id.action";

export default async function HomePage() {
  const customs = await getCustomAction();
  const nameMap = new Map<string, string>();
  if (customs && customs.data) {
    for (const custom of customs.data) {
      const creatorName = await findSummonerNameByIdAction(custom.creatorId);
      if (creatorName) {
        nameMap.set(custom.creatorId, creatorName);
      }
    }
  }

  return (
    <div className=" flex size-full flex-wrap justify-center gap-4 overflow-scroll  pt-8">
      {customs?.data &&
        customs.data.map((custom) => (
          <div
            key={custom.id}
            className="relative flex h-1/3 w-60 flex-col items-center justify-center overflow-hidden rounded-lg border border-accent bg-black/60"
          >
            <h1 className="flex h-1/6 w-full items-center justify-center border-accent outline outline-1 outline-accent">
              {custom.name}
            </h1>
            <p className="flex h-1/6 w-full items-center justify-center border-accent outline outline-1 outline-accent">
              {nameMap.get(custom.creatorId)}
            </p>
            <p className="flex h-1/2 w-full  overflow-hidden border-accent outline outline-1 outline-accent">
              {custom.description}
            </p>
            <div className="flex h-1/6 w-full items-center justify-center border-accent outline outline-1 outline-accent">
              <a
                href={`/customs/${custom.id}`}
                className="flex size-full items-center justify-center hover:scale-y-95"
              >
                join
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}
