"use client";

import { Button } from "@/components/ui/button";
import { useUserContext } from "./user-context-provider";
import { useSession } from "next-auth/react";

const ConnectSummonerReminder = () => {
  const userConstext = useUserContext();
  const session = useSession();

  if (!session.data?.user) {
    return null;
  } else if (userConstext.user?.summoner) {
    return null;
  } else {
    return (
      <div className="absolute bottom-5 flex h-auto w-full items-center justify-center">
        <a className="no-style-link w-1/2" href="/account">
          <Button className="w-full animate-bounce">Connect Summoner</Button>
        </a>
      </div>
    );
  }
};

export default ConnectSummonerReminder;
