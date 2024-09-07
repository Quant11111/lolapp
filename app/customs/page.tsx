"use client";

import { getCustomAction } from "./get-customs-action";
import { findSummonerNameByIdAction } from "./find-summoner-name-by-id.action";
import { Button } from "@/components/ui/button";
import { ArrowRight, DoorOpen, Swords } from "lucide-react";
import { useEffect, useState } from "react";
import { Custom } from "@prisma/client";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

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
    <div className=" flex size-full flex-wrap justify-center gap-8 overflow-scroll  py-8 md:gap-12 lg:gap-20">
      {customs &&
        customs.map((custom) => (
          <div
            key={custom.id}
            className="hover:shadow-3xl relative flex h-60 w-80 flex-col items-center justify-center overflow-hidden rounded-lg bg-primary-foreground/30 shadow-2xl shadow-accent outline outline-1 outline-primary-foreground transition-all hover:shadow-foreground hover:outline  hover:outline-foreground"
          >
            <h1 className=" flex h-7 w-full items-center justify-center border-accent bg-accent font-bold text-primary-foreground ">
              {custom.name}
            </h1>
            <div className="relative flex h-7 w-full items-center justify-center  bg-accent">
              <p className="absolute left-2 mb-1 flex h-7 scale-75 justify-center text-center font-bold">
                by :
              </p>{" "}
              <a
                href={`/summoners/${custom.creatorId}`}
                className="no-style-link mx-1 mb-1 flex h-6 w-full items-center justify-center rounded-t-lg bg-primary-foreground outline outline-2 outline-accent transition-all hover:border hover:border-primary-foreground hover:bg-foreground hover:font-bold hover:text-primary-foreground"
              >
                {nameMap.get(custom.creatorId)}
              </a>
            </div>

            <p className="text-s mx-1 flex  w-full grow overflow-scroll  border-x-4 border-accent px-2 py-1 text-justify">
              {custom.description}
            </p>
            {custom.discordLink && (
              <div className="absolute bottom-11 right-2 flex size-6 items-center justify-center rounded-lg bg-accent font-bold text-primary-foreground outline-accent">
                <span className="[&>svg]:size-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
                  </svg>
                </span>
              </div>
            )}
            <a
              href={`/customs/${custom.id}`}
              className="no-style-link flex h-1/6 w-full scale-x-105 items-center justify-center bg-accent"
            >
              <Button
                variant={"outline"}
                className="mx-1 size-full scale-x-105 gap-2 rounded-b-lg rounded-t-none font-bold"
              >
                Join
                <Swords />
              </Button>{" "}
            </a>
          </div>
        ))}
    </div>
  );
}
