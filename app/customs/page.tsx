"use client";

import { getCustomAction } from "./get-customs-action";
import { findSummonerByUserIdAction } from "./find-summoner-by-userid.action";
import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";
import { useEffect, useState } from "react";
import { Custom } from "@prisma/client";
import CustomCard from "./CustomCard";
export default function HomePage() {
  const [customs, setCustoms] = useState<Custom[] | null>(null);
  const [nameMap, setNameMap] = useState(new Map<string, string>());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustoms = async () => {
      const customsData = await getCustomAction();
      if (customsData?.data) {
        setCustoms(customsData?.data);
        const nameMapTemp = new Map<string, string>();
        for (const custom of customsData.data) {
          const creator = await findSummonerByUserIdAction(custom.creatorId);
          if (creator) {
            nameMapTemp.set(custom.creatorId, creator.gameName);
          }
        }
        setNameMap(nameMapTemp);
      } else {
        setError("Error fetching customs");
      }
    };
    fetchCustoms();
  }, []);

  if (!customs) {
    return (
      <div className="flex size-full items-center justify-center">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  } else if (error) {
    return (
      <div className="flex size-full items-center justify-center">
        <p className="text-2xl font-bold">{error}</p>
      </div>
    );
  } else {
    return (
      <div className=" flex size-full flex-wrap justify-center gap-8 overflow-scroll  py-8 md:gap-12 lg:gap-20">
        {customs &&
          customs.map((custom) => (
            <>
              <CustomCard
                custom={custom}
                creatorName={nameMap.get(custom.creatorId)}
              />
            </>
          ))}
      </div>
    );
  }
}
