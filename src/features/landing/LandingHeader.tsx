"use client";

import { SiteConfig } from "@/site-config";
import { AuthButtonClient } from "../auth/AuthButtonClient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LandingHeader() {
  const router = useRouter();
  return (
    <div className="relative mx-auto flex w-full items-center justify-between border-b-2 border-accent bg-background/20 py-4 shadow-md lg:px-8">
      <div className="flex">
        <div className="w-12" />

        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          className="text-2xl font-bold"
        >
          {SiteConfig.title}
        </Button>
      </div>
      <nav className="flex items-center gap-6 text-gray-600">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/newPlayer">new Player ?</a>
        <AuthButtonClient />
      </nav>
    </div>
  );
}
