"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex size-full justify-center">
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
  );
}
