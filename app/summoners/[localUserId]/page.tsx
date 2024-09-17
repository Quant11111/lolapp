"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SetRolesForm } from "./SetRolesForm";
import { SetPresentationForm } from "./setPresentationForm";
import { findUserByIdAction } from "../../customs/find-user-by-id.action";
import { UserWithSummoner } from "../../user-context-provider";

const CustomGamePage = ({ params }: { params: { localUserId: string } }) => {
  const session = useSession();
  console.log(params.localUserId);
  const isOwnProfile =
    params.localUserId === session.data?.user?.id ||
    params.localUserId === "id";
  console.log(isOwnProfile);
  const queryParam =
    params.localUserId === "id" && session.data?.user?.id
      ? session.data?.user.id
      : params.localUserId;
  const [user, setUser] = useState<UserWithSummoner | null>(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<unknown>(null);
  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const userData = await findUserByIdAction(queryParam);

        setUser(userData);
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
  if (user) {
    return (
      <div className="flex size-full justify-center">
        <div className="relative flex w-full flex-col items-center justify-center ">
          {/* header */}
          <div className="relative flex h-32 w-full items-center justify-center  border border-accent">
            <div className="relative flex h-full w-1/4 flex-col items-center justify-center  border border-accent">
              <h2 className="relative flex h-1/3 w-full items-center justify-center  border border-accent">
                {" "}
                {user.summoner?.gameName}#{user.summoner?.tagLine} lv.
                {user.summoner?.summonerLevel}
              </h2>
              <p className="relative flex h-1/3 w-full items-center justify-center  border border-accent">
                Summoner Rank: {user.summoner?.tier} {user.summoner?.rank}
              </p>
              <div className="relative flex h-1/3 w-full items-center justify-center border  border-accent p-2">
                {isOwnProfile ? (
                  <SetRolesForm />
                ) : (
                  <p>
                    Roles : {user.firstRole} / {user.secondRole}
                  </p>
                )}
              </div>
            </div>
            <div className="relative flex h-full w-1/6 items-center justify-center  border border-accent">
              Summoner IconId: {user.summoner?.profileIconId}
            </div>
            <div className="relative flex h-full grow items-center justify-center  border border-accent">
              {isOwnProfile ? (
                <SetPresentationForm user={user} />
              ) : (
                <p>{user.pinnedPresentation}</p>
              )}
            </div>
          </div>
          {/* feed section */}
          <div className="relative flex w-full grow flex-col items-center justify-center  border border-accent">
            here we plan to let you display you best clips in order to show off
            ;{")"}
          </div>
        </div>
      </div>
    );
  }
};

export default CustomGamePage;
