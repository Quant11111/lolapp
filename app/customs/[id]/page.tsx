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
      <div className="flex size-full  flex-col gap-4 p-4">
        <div className="flex h-32 w-full flex-col items-center justify-center gap-4 rounded  md:flex-row">
          <div className="flex size-full flex-col items-center justify-center gap-2 rounded md:w-72">
            <p className="flex size-full items-center justify-center text-clip rounded-t-2xl bg-accent text-center font-bold text-primary-foreground outline-primary-foreground">
              {custom.name}
            </p>
            {creator?.gameName ? (
              <Button
                variant="outline"
                className="w-full rounded-b-2xl"
                onClick={() => router.push(`/summoners/${creator?.userId}`)}
              >
                {creator?.gameName} - {creator?.tier} {creator?.rank}{" "}
              </Button>
            ) : (
              "loading..."
            )}{" "}
          </div>
          <div className="flex size-full overflow-scroll rounded bg-gray-950/75 outline outline-secondary-foreground">
            <p className="text-pretty p-2">{custom.description}</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="flex h-96 min-w-40   gap-4 rounded shadow-slate-300 outline outline-accent md:h-2/3 md:w-1/2">
            {isCreator ? (
              <div className=" w-full overflow-x-auto">
                <table className="flex h-full min-w-full flex-col divide-y-2 divide-accent">
                  <thead className="h-14 w-full overflow-hidden ltr:text-right rtl:text-left">
                    <tr className="flex w-full justify-around rounded outline outline-8 outline-accent">
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

                  <tbody className="flex min-w-full grow flex-col divide-y divide-accent overflow-scroll">
                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>

                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>
                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>
                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>
                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>
                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>
                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>
                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>
                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>
                    <tr className="flex w-full items-center justify-around">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Potent
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Master II
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        TOP/JGL
                      </td>
                      <td className="flex gap-4 whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-blue-300"
                        >
                          B
                        </Button>
                        <Button
                          variant="default"
                          size={"icon"}
                          className="bg-red-300"
                        >
                          R
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div>Waiting Game</div>
            )}

            {/* {isCreator ? <ManageCustomGame custom={custom} setCustom={setCustom} /> : <WaitingGame />} */}
          </div>
          <div className="flex h-96 min-w-40   gap-4 rounded shadow-slate-300 outline outline-accent md:h-2/3 md:w-1/2">
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
      <div className="flex size-full  flex-col items-center justify-center gap-4 p-4 ">
        <div className="flex h-20 w-full flex-col items-center justify-center gap-6 ">
          <div className="w-30 flex h-full flex-col items-center justify-center gap-2">
            <Swords size={48} />
            <h1 className=" text-2xl font-bold">{error}</h1>
          </div>
          <div className="w-80 outline outline-1 outline-accent drop-shadow-2xl" />
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
