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
    return (
      <div className="flex size-full items-center justify-center">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex size-full items-center justify-center">
        We couldn't find this user. Try to refresh the page.
      </div>
    );
  }
  if (summoner) {
    return (
      <div className="flex size-full justify-center">
        <div className="relative flex w-full flex-col items-center justify-center ">
          {/* header */}
          <div className="relative flex h-32 w-full items-center justify-center  border border-accent">
            <div className="relative flex h-full w-1/4 flex-col items-center justify-center  border border-accent">
              <h1 className="relative flex h-1/4 w-full items-center justify-center  border border-accent">
                {session.data?.user.name}
              </h1>
              <h2 className="relative flex h-1/4 w-full items-center justify-center  border border-accent">
                {" "}
                {summoner.gameName}#{summoner.tagLine}
              </h2>
              <p className="relative flex h-1/4 w-full items-center justify-center  border border-accent">
                Summoner Rank: {summoner.tier} {summoner.rank}
              </p>
              <p className="relative flex h-1/4 w-full items-center justify-center  border border-accent">
                Roles: {summoner.firstRole} / {summoner.secondRole}
              </p>
            </div>
            <div className="relative flex h-full w-1/6 items-center justify-center  border border-accent">
              <p>Summoner IconId: {summoner.profileIconId}</p>
            </div>
            <div className="relative flex h-full grow items-center justify-center  border border-accent">
              <p>pinnedPresentation: {summoner.pinnedPresentation}</p>
            </div>
          </div>
          {/* feed section */}
          <div className="relative flex w-full grow flex-col items-center justify-center  border border-accent">
            Summoner Feed
          </div>

          {/*
            <h1>Summoner Data of {session.data?.user.name}</h1>
          <div>
            <p>
              Summoner Name: {summoner.gameName}#{summoner.tagLine}
            </p>
            <p>Summoner Level: {summoner.summonerLevel}</p>
            <p>Summoner IconId: {summoner.profileIconId}</p>
            <p>pinnedPresentation: {summoner.pinnedPresentation}</p>
            <p>Nombre de customs créées: {summoner.createdCustomIds.length}</p>
            <p>
              Roles: {summoner.firstRole} / {summoner.secondRole}
            </p>
            <p>
              Summoner Rank: {summoner.tier} {summoner.rank}
            </p>
          </div>
            */}
        </div>
      </div>
    );
  }
};

export default CustomGamePage;
