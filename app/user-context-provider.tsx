"use client";
import { Summoner, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { findSummonerByUserIdAction } from "./customs/find-summoner-by-userid.action";

type UserContextType = {
  user: User | null;
  summoner: Summoner | null;
  refetchUser: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  summoner: null,
  refetchUser: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [summoner, setSummoner] = useState<Summoner | null>(null);
  const session = useSession();
  const refetchUser = async () => {
    if (!session?.data?.user) {
      setUser(null);
    } else {
      const summonerData = await findSummonerByUserIdAction(
        session.data.user.id,
      );
      setSummoner(summonerData);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.data?.user) {
        setUser(null);
      } else {
        const summonerData = await findSummonerByUserIdAction(
          session.data.user.id,
        );
        setSummoner(summonerData);
      }
    };
    fetchUser();
  }, [session]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        summoner: summoner,
        refetchUser: refetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
