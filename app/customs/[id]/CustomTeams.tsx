import { ExtendedCustom } from "./page";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Cross } from "lucide-react";
import {
  removeFromBlueTeamAction,
  removeFromRedTeamAction,
} from "./manage-teams.action";

type CustomTeamsProps = {
  custom?: ExtendedCustom | null;
  refetch: () => Promise<void>;
};

const CustomTeams = ({ custom, refetch }: CustomTeamsProps) => {
  const session = useSession();
  const isManager = session.data?.user.id === custom?.creatorId;
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
            {custom.blueTeam.map((user, index) => (
              <div
                key={index}
                className="flex h-12 w-full items-center justify-center gap-2 rounded border border-accent"
              >
                <p>{user.summoner?.gameName}</p>
                <p>
                  {user.firstRole}/{user.secondRole}
                </p>
                <p>
                  {user.summoner?.rank}
                  {user.summoner?.tier}
                </p>
                {isManager && (
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => {
                      removeFromBlueTeamAction(custom.id, user.id);
                      refetch();
                    }}
                  >
                    <Cross />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            {custom.redTeam.map((user, index) => (
              <div
                key={index}
                className="flex h-12 w-full items-center justify-center gap-2 rounded border border-accent"
              >
                <p>{user.summoner?.gameName}</p>
                <p>
                  {user.firstRole}/{user.secondRole}
                </p>
                <p>
                  {user.summoner?.rank}
                  {user.summoner?.tier}
                </p>
                {isManager && (
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => {
                      removeFromRedTeamAction(custom.id, user.id);
                      refetch();
                    }}
                  >
                    <Cross />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default CustomTeams;
