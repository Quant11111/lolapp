import { getCustomAction } from "./get-customs-action";
import { findSummonerNameByIdAction } from "./find-summoner-name-by-id.action";
import { Button } from "@/components/ui/button";
import { ArrowRight, DoorOpen, Swords } from "lucide-react";
import { useEffect, useState } from "react";
import { Custom } from "@prisma/client";

export default function HomePage() {
  const [customs, setCustoms] = useState<Custom[] | null>(null);
  const [nameMap, setNameMap] = useState(new Map<string, string>());

  useEffect(() => {
    const fetchCustoms = async () => {
      const customsData = await getCustomAction();
      if (customsData?.data) {
        setCustoms(customsData?.data);
        const nameMapTemp = new Map<string, string>();
        for (const custom of customsData.data) {
          const creatorName = await findSummonerNameByIdAction(
            custom.creatorId,
          );
          if (creatorName) {
            nameMapTemp.set(custom.creatorId, creatorName);
          }
        }
        setNameMap(nameMapTemp);
      } else {
        setCustoms([]);
      }
    };

    fetchCustoms();
  }, []);

  return (
    <div className=" flex size-full flex-wrap justify-center gap-8 overflow-scroll  pt-8">
      {customs &&
        customs.map((custom) => (
          <div
            key={custom.id}
            className="relative flex h-1/3 w-80 flex-col items-center justify-center overflow-hidden rounded-lg outline outline-1 outline-accent"
          >
            <h1 className=" min-h-1/6 flex w-full items-center justify-center border-accent bg-accent font-bold text-primary-foreground ">
              {custom.name}
            </h1>

            <a
              href={`/summoners/${custom.creatorId}`}
              className="no-style-link flex h-10 w-full  items-center justify-center bg-primary-foreground/50 outline outline-1 outline-accent  hover:outline-foreground"
            >
              {nameMap.get(custom.creatorId)}
            </a>

            <p className="text-s flex w-full grow overflow-hidden border-accent px-2 py-1 text-justify ">
              {custom.description}
            </p>

            <a
              href={`/customs/${custom.id}`}
              className="h-1/6 w-full scale-x-105"
            >
              <Button variant={"outline"} className="size-full font-bold ">
                <Swords />
                <ArrowRight />
                <DoorOpen />
              </Button>{" "}
            </a>
          </div>
        ))}
    </div>
  );
}
