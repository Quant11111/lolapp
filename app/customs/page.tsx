import { getCustomAction } from "./get-customs-action";
import { findSummonerNameByIdAction } from "./find-summoner-name-by-id.action";
import { Button } from "@/components/ui/button";
import { ArrowRight, DoorOpen, Swords } from "lucide-react";

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
    <div className=" flex size-full flex-wrap justify-center gap-8 overflow-scroll  pt-8">
      {customs?.data &&
        customs.data.map((custom) => (
          <div
            key={custom.id}
            className="relative flex h-1/3 w-80 flex-col items-center justify-center overflow-hidden rounded-lg outline outline-accent"
          >
            <h1 className=" flex h-1/6 w-full items-center justify-center border-accent bg-primary-foreground/50 font-bold text-foreground outline outline-1 outline-accent">
              {custom.name}
            </h1>
            <div className="flex h-1/6 w-full items-center justify-center border-accent outline outline-1 outline-accent">
              <a
                href={`/summoners/${custom.creatorId}`}
                className="no-style-link w-full scale-x-125 "
              >
                <Button
                  variant={"default"}
                  className="w-full outline  outline-primary-foreground"
                >
                  {nameMap.get(custom.creatorId)}
                </Button>{" "}
              </a>
            </div>
            <p className="text-s flex h-1/2  w-full overflow-hidden border-accent px-2 py-1 text-justify outline outline-1 outline-accent">
              {custom.description}
            </p>
            <div className="flex h-1/6 w-full items-center justify-center overflow-hidden border-accent outline outline-1 outline-accent">
              <a href={`/customs/${custom.id}`} className="w-full scale-x-125">
                <Button variant={"outline"} className="w-full font-bold ">
                  <Swords />
                  <ArrowRight />
                  <DoorOpen />
                </Button>{" "}
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}
