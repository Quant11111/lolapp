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
      <div className="flex size-full  flex-col  gap-2 overflow-scroll p-4 md:items-center md:justify-center">
        <div className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded  md:flex-row">
          <div className="flex size-full flex-col items-center justify-center gap-2 rounded md:w-40">
            <p className="size-full justify-center text-clip rounded text-center font-bold outline">
              {custom.name}
            </p>
            <p className=" flex size-full text-balance font-bold">
              {creator?.gameName ? (
                <a
                  href={`/summoners/${creator?.userId}`}
                  className="no-style-link flex size-full items-center justify-center rounded outline"
                >
                  {creator?.gameName} {creator?.tier} {creator?.rank}{" "}
                </a>
              ) : (
                "loading..."
              )}{" "}
            </p>
          </div>
          <div className="flex size-full overflow-scroll  rounded outline">
            <p className="text-pretty p-2">{custom.description}</p>
          </div>
        </div>
        <div className="flex w-full flex-col  gap-2 md:flex-row">
          <div className=" flex min-h-72 min-w-40 items-center justify-center gap-2 rounded outline md:h-full md:w-1/2">
            {isCreator ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-accent ">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Date of Birth
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Role
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Salary
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-accent">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        John Doe
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        24/05/1995
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Web Developer
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        $120,000
                      </td>
                    </tr>

                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Jane Doe
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        04/11/1980
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Web Designer
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        $100,000
                      </td>
                    </tr>

                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">
                        Gary Barlow
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        24/05/1995
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        Singer
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-secondary-foreground">
                        $20,000
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
          <div className="flex min-h-72 min-w-40 flex-col items-center justify-center gap-2 rounded outline md:w-1/2">
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
