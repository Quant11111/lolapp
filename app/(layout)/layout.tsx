import { Header } from "@/features/layout/Header";
import type { PropsWithChildren } from "react";

export default function RouteLayout(props: PropsWithChildren) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="min-h-full flex-1 pb-16">{props.children}</div>
    </div>
  );
}
