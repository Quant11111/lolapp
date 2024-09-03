import { PageParams } from "@/types/next";
import { CreateCustomForm } from "./CreateCustomForm";

export default async function RoutePage(props: PageParams<{}>) {
  /**
   * Usually in this page you would fetch the data from the database
   * So the form mount with the current data
   */
  return (
    <div className="relative flex items-center justify-center">
      <CreateCustomForm />
    </div>
  );
}
