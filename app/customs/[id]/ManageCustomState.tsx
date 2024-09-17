import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { ExtendedCustom } from "./page";

type ManageCustomStateProps = {
  custom: ExtendedCustom;
  setCustom: Dispatch<SetStateAction<ExtendedCustom | null>>;
};

const ManageCustomState = ({ custom, setCustom }: ManageCustomStateProps) => {
  return (
    <div className="flex size-20 flex-col justify-around gap-2">
      <Button variant={"destructive"} className=" w-16">
        Cancel Event
      </Button>
      <Button variant={"outline"} className=" w-16">
        Lock Teams
      </Button>
    </div>
  );
};

export default ManageCustomState;
