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
    <div className=" flex size-full flex-wrap justify-center gap-3 overflow-scroll pt-3">
      {customs?.data &&
        customs.data.map((custom) => (
          <div
            key={custom.id}
            className="relative flex h-1/3 w-60 flex-col items-center justify-center rounded-lg border border-accent"
          >
            <h1 className="w-1/2 border-b-2 border-accent text-center">
              {custom.name}
            </h1>
            <p className="w-full  border-b-2 border-accent pb-4 text-center">
              {nameMap.get(custom.creatorId)}
            </p>
            <p className="w-full  grow overflow-hidden border-b-2 border-accent pb-4 text-center">
              {custom.description}
            </p>
            <div className="h-1/6">
              <a className="size-full">join</a>
            </div>
          </div>
        ))}
    </div>
  );
}
