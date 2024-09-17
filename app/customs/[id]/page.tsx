"use client";

import { Swords } from "lucide-react";
import { getCustomDataAction } from "./get-custom-data.action";
import { Custom } from "@prisma/client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CustomTeams from "./CustomTeams";
import { UserWithSummoner } from "../../user-context-provider";
import ManageCustomState from "./ManageCustomState";
import { addToBlueTeamAction, addToRedTeamAction } from "./manage-teams.action";
import JoinLeaveCustom from "./JoinLeaveCustom";

export interface ExtendedCustom extends Custom {
  creator: UserWithSummoner;
  blueTeam: UserWithSummoner[];
  redTeam: UserWithSummoner[];
  candidates: UserWithSummoner[];
}

const CustomGamePage = ({ params }: { params: { id: string } }) => {
  const [custom, setCustom] = useState<ExtendedCustom | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const session = useSession();
  const isCreator = session.data?.user.id === custom?.creatorId;

  const refetchCustom = async () => {
    const customData = await getCustomDataAction(params.id);
    if (!customData) {
      setError("Custom game not found");
    } else {
      setCustom(customData);
    }
  };

  useEffect(() => {
    const fetchCustom = async () => {
      const customData = await getCustomDataAction(params.id);
      if (!customData) {
        setError("Custom game not found");
      } else {
        setCustom(customData);
      }
    };
    fetchCustom();
  }, [params.id, error]);

  if (custom) {
    //MAIN SECTION
    return (
      <div className="flex size-full  flex-col gap-4 p-4">
        <div className="flex h-1/3 w-full flex-col items-center justify-center gap-4 rounded  md:h-32 md:flex-row">
          <div className="flex size-full flex-col items-center justify-center gap-2 rounded md:w-72">
            <p className="flex h-1/2 w-full items-center justify-center text-clip rounded-t-2xl bg-accent text-center font-bold text-secondary outline-primary-foreground">
              {custom.name}
            </p>
            {custom.creator?.summoner ? (
              <Button
                variant="outline"
                className="h-1/2 w-full rounded-b-2xl"
                onClick={() => router.push(`/summoners/${custom?.creator.id}`)}
              >
                {custom.creator.summoner.gameName} -{" "}
                {custom.creator.summoner.tier} {custom.creator.summoner.rank}{" "}
              </Button>
            ) : (
              "loading..."
            )}{" "}
          </div>
          <div className="flex size-full overflow-scroll rounded bg-gray-950/75 outline outline-primary-foreground">
            <p className="text-pretty p-2">{custom.description}</p>
          </div>
          {isCreator ? (
            <ManageCustomState custom={custom} setCustom={setCustom} />
          ) : (
            <JoinLeaveCustom custom={custom} refetch={refetchCustom} />
          )}
        </div>
        <div className="flex size-full flex-col gap-4 overflow-scroll md:flex-row">
          <div className="flex min-w-40   gap-4 rounded shadow-slate-300  md:h-full md:w-1/2">
            {isCreator ? (
              <div className=" w-full overflow-x-auto">
                <table className="flex h-full min-w-full flex-col divide-y-2 divide-border rounded border border-border">
                  <thead className="h-14 w-full overflow-hidden bg-black/70 ltr:text-right rtl:text-left">
                    <tr className="flex w-full justify-around">
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        ELO
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Roles
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        add+
                      </th>
                    </tr>
                  </thead>

                  <tbody className="flex min-w-full grow flex-col divide-y divide-border overflow-scroll">
                    {custom.candidates.map((candidate, index) => (
                      <tr
                        key={index}
                        className="flex w-full items-center justify-around"
                      >
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                          {candidate.summoner?.gameName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-primary-foreground">
                          {candidate.summoner?.tier} {candidate.summoner?.rank}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-primary-foreground">
                          {candidate.firstRole}/{candidate.secondRole}
                        </td>
                        <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-primary-foreground">
                          <Button
                            variant="default"
                            size={"icon"}
                            className="bg-blue-300"
                            onClick={() => {
                              addToBlueTeamAction(custom.id, candidate.id)
                                .then(() => refetchCustom())
                                .catch((err) => setError(err));
                            }}
                          >
                            B
                          </Button>
                          <Button
                            variant="default"
                            size={"icon"}
                            className="bg-red-300"
                            onClick={() => {
                              addToRedTeamAction(custom.id, candidate.id)
                                .then(() => refetchCustom())
                                .catch((err) => setError(err));
                            }}
                          >
                            R
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>Waiting Game</div>
            )}

            {/* {isCreator ? <ManageCustomGame custom={custom} setCustom={setCustom} /> : <WaitingGame />} */}
          </div>
          <div className="flex min-h-96 min-w-40 md:h-full md:w-1/2 md:border-l-2 md:border-primary-foreground md:pl-2">
            <CustomTeams custom={custom} refetch={refetchCustom} />
          </div>
        </div>
      </div>
    );
  } else if (error) {
    //ERROR SECTION
    return (
      <div className="flex size-full  flex-col items-center justify-center gap-4 p-4 ">
        <div className="flex h-20 w-full flex-col items-center justify-center gap-6 ">
          <div className="w-30 flex h-full flex-col items-center justify-center gap-2">
            <Swords size={48} />
            <h1 className=" text-2xl font-bold">{error}</h1>
          </div>
          <div className="w-80 outline outline-1 outline-border drop-shadow-2xl" />
          <div className="relative flex h-full w-1/3 flex-col justify-center gap-4 text-foreground">
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
      <div className="flex size-full  flex-col items-center justify-center gap-4 p-4 ">
        <div className="flex h-20 w-full items-center justify-center gap-4 ">
          <div className="w-30 flex h-full animate-pulse flex-col items-center justify-center gap-4 ">
            <Swords size={48} />
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default CustomGamePage;
