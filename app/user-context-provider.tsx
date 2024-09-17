"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { findUserByIdAction } from "./customs/find-user-by-id.action";

import { Summoner, User } from "@prisma/client";

export interface UserWithSummoner extends User {
  summoner: Summoner | null;
}

type UserContextType = {
  user: UserWithSummoner | null;
  refetchUser: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  refetchUser: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithSummoner | null>(null);
  const session = useSession();
  const refetchUser = async () => {
    if (!session?.data?.user) {
      setUser(null);
    } else {
      const summonerData = await findUserByIdAction(session.data.user.id);
      setUser(summonerData);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.data?.user) {
        setUser(null);
      } else {
        const summonerData = await findUserByIdAction(session.data.user.id);
        setUser(summonerData);
      }
    };
    fetchUser();
  }, [session]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        refetchUser: refetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
