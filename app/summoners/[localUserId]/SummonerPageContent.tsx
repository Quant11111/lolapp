import { UserWithSummoner } from "../../user-context-provider";
import { SetPresentationForm } from "./setPresentationForm";
import { SetRolesForm } from "./SetRolesForm";

type SummonerPageContentProps = {
  summoner: UserWithSummoner;
  refetchSummoner: () => void;
  isOwnProfile: boolean;
};

/*we chose to use the therm summoner to qualify any user  */

const SummonerPageContent = ({
  summoner,
  refetchSummoner,
  isOwnProfile,
}: SummonerPageContentProps) => {
  return (
    <div className="flex size-full justify-center">
      <div className="relative flex w-full flex-col items-center justify-center ">
        {/* header */}
        <div className="relative flex h-32 w-full items-center justify-center  border border-accent">
          <div className="relative flex h-full w-1/4 flex-col items-center justify-center  border border-accent">
            <h1 className="relative flex h-1/3 w-full items-center justify-center  border border-accent">
              {" "}
              {summoner.summoner?.gameName}#{summoner.summoner?.tagLine} lv.
              {summoner.summoner?.summonerLevel}
            </h1>
            <h2 className="relative flex h-1/3 w-full items-center justify-center  border border-accent">
              Summoner Rank: {summoner.summoner?.tier} {summoner.summoner?.rank}
            </h2>
            <div className="relative flex h-1/3 w-full items-center justify-center border  border-accent p-2">
              {isOwnProfile ? (
                <SetRolesForm
                  user={summoner}
                  refetch={refetchSummoner}
                  isOwnProfile={isOwnProfile}
                />
              ) : (
                <h2>
                  Roles : {summoner.firstRole} / {summoner.secondRole}
                </h2>
              )}
            </div>
          </div>
          <div className="relative flex h-full w-1/6 items-center justify-center  border border-accent">
            Summoner IconId: {summoner.summoner?.profileIconId}
          </div>
          <div className="relative flex h-full grow items-center justify-center  border border-accent">
            {isOwnProfile ? (
              <SetPresentationForm
                user={summoner}
                refetch={refetchSummoner}
                isOwnProfile={isOwnProfile}
              />
            ) : (
              <p>{summoner.pinnedPresentation}</p>
            )}
          </div>
        </div>
        {/* feed section */}
        <div className="relative flex w-full grow flex-col items-center justify-center  border border-accent">
          here we plan to let you display you best clips in order to show off ;
          {")"}
        </div>
      </div>
    </div>
  );
};

export default SummonerPageContent;
