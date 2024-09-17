import { useSession } from "next-auth/react";
import { ExtendedCustom } from "./page";
import {
  joinCustomAction,
  leaveCustomAction,
} from "./join-leave-custom.action";

type JoinLeaveCustomProps = {
  custom: ExtendedCustom;
  refetch: () => Promise<void>;
};

const JoinLeaveCustom = ({ custom, refetch }: JoinLeaveCustomProps) => {
  const session = useSession();
  if (!session.data?.user) {
    return null;
  }
  const isCandidate = custom.candidates.some(
    (candidate) => candidate.id === session.data?.user.id,
  );
  if (isCandidate) {
    return (
      <button
        onClick={() => {
          leaveCustomAction(custom.id, session.data?.user.id);
          refetch();
        }}
      >
        Leave
      </button>
    );
  } else {
    return (
      <button
        onClick={() => {
          joinCustomAction(custom.id, session.data?.user.id);
          refetch();
        }}
      >
        Join
      </button>
    );
  }
};

export default JoinLeaveCustom;
