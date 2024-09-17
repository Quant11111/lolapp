import { Custom, Summoner } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type CustomTeamsProps = {
  custom?: Custom;
  blueTeam: Summoner[];
  setBlueTeam: Dispatch<SetStateAction<Summoner[]>>;
  redTeam: Summoner[];
  setRedTeam: Dispatch<SetStateAction<Summoner[]>>;
};

const CustomTeams = ({
  custom,
  blueTeam,
  setBlueTeam,
  redTeam,
  setRedTeam,
}: CustomTeamsProps) => {
  if (!custom) {
    return <div>Custom not found</div>;
  } else {
    return (
      <div className="flex size-full flex-col items-center justify-center gap-4 p-2">
        <div className="flex w-full gap-4">
          <div className="flex w-1/2 flex-col gap-1">
            <div className="flex h-12 w-full items-center justify-center rounded border border-background bg-ring text-secondary">
              Blue Team
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <div className="flex h-12 w-full items-center justify-center rounded border border-background bg-destructive-foreground text-destructive">
              Red Team
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-1/2 flex-col gap-1">
            {blueTeam.map((summoner, index) => (
              <div
                key={index}
                className="flex h-12 w-full items-center justify-center gap-2 rounded border border-accent"
              >
                <p>{summoner.gameName}</p>
                <p>
                  {summoner.firstRole}/{summoner.secondRole}
                </p>
                <p>
                  {summoner.rank}
                  {summoner.tier}
                </p>
              </div>
            ))}
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <div className="flex h-12 w-full items-center justify-center gap-2 rounded border border-accent">
              <p>TOP</p> <p>Player</p>
            </div>
            <div className="flex h-12 w-full items-center justify-center gap-2 rounded border border-accent">
              <p>JGL</p> <p>Player</p>
            </div>
            <div className="flex h-12 w-full items-center justify-center gap-2 rounded border border-accent">
              <p>MID</p> <p>Player</p>
            </div>
            <div className="flex h-12 w-full items-center justify-center gap-2 rounded border border-accent">
              <p>BOT</p> <p>Player</p>
            </div>
            <div className="flex h-12 w-full items-center justify-center gap-2 rounded border border-accent">
              <p>SUP</p> <p>Player</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CustomTeams;
