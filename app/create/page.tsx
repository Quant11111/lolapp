import { PageParams } from "@/types/next";
import { CreateCustomForm } from "./CreateCustomForm";
import { UserContextProvider } from "../user-context-provider";
import ConnectSummonerReminder from "../ConnectSummonerReminder";

export default async function RoutePage(props: PageParams<{}>) {
  /**
   * Usually in this page you would fetch the data from the database
   * So the form mount with the current data
   */
  return (
    <div className="relative flex size-full items-center justify-center">
      <UserContextProvider>
        <CreateCustomForm />
      </UserContextProvider>
      <ConnectSummonerReminder />
    </div>
  );
}
