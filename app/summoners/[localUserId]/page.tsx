"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSummonerDataAction } from "./get-summoner-data.action";
import { Summoner } from "@prisma/client";

const CustomGamePage = ({ params }: { params: { localUserId: string } }) => {
  const session = useSession();
  const queryParam =
    params.localUserId === "id" && session.data?.user?.id
      ? session.data?.user.id
      : params.localUserId;
  const [summoner, setSummoner] = useState<Summoner | null>(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<unknown>(null);
  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const summonerData = await getSummonerDataAction(queryParam);
        setSummoner(summonerData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummonerData();
  }, [queryParam]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>We couldn't find this user. Try to refresh the page.</div>;
  }
  if (summoner) {
    return (
      <div className="flex size-full justify-center">
        <div className="relative flex h-full w-1/3 flex-col justify-center gap-2 text-foreground">
          <h1>Summoner Data of {session.data?.user.name}</h1>
          <div>
            <p>
              Summoner Name: {summoner.gameName}#{summoner.tagLine}
            </p>
            <p>Summoner Level: {summoner.summonerLevel}</p>
            <p>Summoner IconId: {summoner.profileIconId}</p>
            <p>Nombre de customs créées: {summoner.createdCustomIds.length}</p>
            <p>
              Roles: {summoner.firstRole} / {summoner.secondRole}
            </p>
            <p>
              Summoner Rank: {summoner.tier} {summoner.rank}
            </p>

            {/* Affichez d'autres données du summoner selon vos besoins */}
          </div>
        </div>
      </div>
    );
  }
};

export default CustomGamePage;
