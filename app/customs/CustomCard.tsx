import { Button } from "@/components/ui/button";
import { Custom } from "@prisma/client";
import { Swords, Wand } from "lucide-react";
import { useRouter } from "next/navigation";

type CustomCardProps = {
  custom?: Custom;
  creatorName?: string;
};

const CustomCard = ({ custom, creatorName }: CustomCardProps) => {
  const router = useRouter();
  if (!custom) {
    return <div>Custom not found</div>;
  } else {
    return (
      <div
        key={custom.id}
        className=" group relative flex h-60 w-80 flex-col items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-accent/30 to-ring/30 px-2 shadow-2xl shadow-accent outline outline-1 outline-background transition-all hover:bg-gradient-to-r hover:from-ring/30 hover:to-secondary/30  hover:shadow-cyan-500 hover:outline"
      >
        <div className=" absolute bottom-[7.5rem] z-10 flex w-full flex-col items-center justify-around bg-accent px-1  font-extrabold text-background outline outline-background transition-all  group-hover:bottom-[10.625rem] group-hover:top-0 group-hover:outline-none">
          <h1 className="flex min-h-8 w-full items-center justify-center transition-all">
            {custom.name}
          </h1>
          <div className="h-0 w-full items-center justify-center overflow-hidden  bg-accent transition-opacity duration-300 group-hover:flex group-hover:h-auto group-hover:py-2">
            {creatorName ? (
              <Button
                variant={"outline"}
                className=" mx-2 flex h-8 w-full gap-2 transition-all  group-hover:rounded-lg"
                onClick={() => router.push(`/summoners/${custom.creatorId}`)}
              >
                <p className="">by :</p> <p>{creatorName}</p>
              </Button>
            ) : (
              <Button
                variant={"outline"}
                className=" mx-2 flex h-8 w-full gap-2 transition-all group-hover:rounded-lg"
              >
                <p className="">loading...</p>
              </Button>
            )}
          </div>
        </div>
        <p className="absolute inset-y-[7.5rem] hidden w-full overflow-hidden text-pretty rounded-xl  p-1 outline outline-8 outline-accent  transition-all group-hover:bottom-9 group-hover:top-[4.25rem] group-hover:flex group-hover:overflow-scroll group-hover:outline-4">
          {custom.description}
        </p>

        <div className="absolute top-[7.5rem] z-20 flex w-full  flex-col items-center justify-around bg-accent  font-extrabold  text-background outline outline-background transition-all group-hover:bottom-0  group-hover:top-[12.5rem] group-hover:px-1 group-hover:outline-none">
          <Button
            onClick={() => router.push(`/customs/${custom.id}`)}
            variant={"outline"}
            className="flex h-8 w-full gap-2 rounded-lg  "
          >
            <Swords />
            <p>Join</p> <Wand />
          </Button>
        </div>
      </div>
    );
  }
};

export default CustomCard;
