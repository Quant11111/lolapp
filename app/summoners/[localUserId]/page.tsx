"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { findUserByIdAction } from "../../customs/find-user-by-id.action";
import { UserWithSummoner } from "../../user-context-provider";
import SummonerPageContent from "./SummonerPageContent";

const SummonerPage = ({ params }: { params: { localUserId: string } }) => {
  const session = useSession();

  const isOwnProfile =
    params.localUserId === session.data?.user?.id ||
    params.localUserId === "id";

  const queryParam =
    params.localUserId === "id" && session.data?.user?.id
      ? session.data?.user.id
      : params.localUserId;

  const [user, setUser] = useState<UserWithSummoner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const refetchSummonerData = async () => {
    try {
      const userData = await findUserByIdAction(queryParam);

      setUser(userData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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
      <SummonerPageContent
        summoner={user}
        refetchSummoner={refetchSummonerData}
        isOwnProfile={isOwnProfile}
      />
    );
  }
};

export default SummonerPage;
