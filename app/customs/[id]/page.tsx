"use client";

import { Swords } from "lucide-react";
import { getCustomDataAction } from "./get-custom-data.action";
import { Custom, Summoner } from "@prisma/client";
import { useEffect, useState } from "react";
import { findSummonerByUserIdAction } from "../find-summoner-by-userid.action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CustomGamePage = ({ params }: { params: { id: string } }) => {
  const [custom, setCustom] = useState<Custom | null>(null);
  const [creator, setCreator] = useState<Summoner | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const session = useSession();
  const isCreator = session.data?.user.id === custom?.creatorId;

  useEffect(() => {
    const fetchCustom = async () => {
      const customData = await getCustomDataAction(params.id);
      if (!customData) {
        setError("Custom game not found");
      } else {
        setCustom(customData);
        const creatorData = await findSummonerByUserIdAction(
          customData.creatorId,
        );
        if (creatorData) {
          setCreator(creatorData);
        } else {
          setError("No Summoner linked to the custom creator");
        }
      }
    };
    fetchCustom();
  }, [params.id, error]);

  if (custom) {
    //MAIN SECTION
    return (
      <div className="flex size-full  flex-col items-center justify-center gap-2 p-4">
        <div className="flex h-32 w-full flex-wrap items-center justify-center gap-2 rounded outline">
          <div className="w-30 flex h-full flex-col items-center justify-center gap-2 rounded outline">
            <p className="rounded text-2xl font-bold outline">{custom.name}</p>
            <p className="text-2xl font-bold">
              {creator?.gameName ? (
                <a
                  href={`/summoners/${creator?.userId}`}
                  className="no-style-link"
                >
                  {creator?.gameName} {creator?.tier} {creator?.rank}{" "}
                </a>
              ) : (
                "loading..."
              )}{" "}
            </p>
          </div>
          <div className="flex h-full min-w-96 grow items-center justify-center overflow-scroll rounded outline">
            <p className="text-lg">{custom.description}</p>
          </div>
        </div>
        <div className="flex-flex-wrap flex h-2/3 w-full items-center justify-center gap-2 outline">
          <div className="flex h-full w-96 items-center justify-center gap-2 rounded outline">
            {/* {isCreator ? <ManageCustomGame custom={custom} setCustom={setCustom} /> : <WaitingGame />} */}
          </div>
          <div className="flex h-full min-w-96 grow flex-col items-center justify-center gap-2 rounded outline">
            {/* <TeamSection custom={custom} />
              {isCreator && (
                <SetCustomStateSection custom={custom} setCustom={setCustom} />
              )} */}
          </div>
        </div>
      </div>
    );
  } else if (error) {
    //ERROR SECTION
    return (
      <div className="flex size-full  flex-col items-center justify-center gap-2 p-4 ">
        <div className="flex h-20 w-full flex-col items-center justify-center gap-6 ">
          <div className="w-30 flex h-full flex-col items-center justify-center gap-2">
            <Swords size={48} />
            <h1 className=" text-2xl font-bold">{error}</h1>
          </div>
          <div className="w-80 outline outline-1 outline-accent drop-shadow-2xl" />
          <div className="relative flex h-full w-1/3 flex-col justify-center gap-2 text-foreground">
            <Button
              onClick={() => router.push("/create")}
              variant={"outline"}
              size={"lg"}
            >
              Create
            </Button>
            <Button onClick={() => router.push("/customs")} variant={"default"}>
              Browse
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    //LOADING SECTION
    return (
      <div className="flex size-full  flex-col items-center justify-center gap-2 p-4 ">
        <div className="flex h-20 w-full items-center justify-center gap-2 ">
          <div className="w-30 flex h-full animate-pulse flex-col items-center justify-center gap-2 ">
            <Swords size={48} />
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default CustomGamePage;
