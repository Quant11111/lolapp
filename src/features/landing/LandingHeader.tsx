"use client";

import { SiteConfig } from "@/site-config";
import { AuthButtonClient } from "../auth/AuthButtonClient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

export function LandingHeader() {
  const router = useRouter();
  return (
    <div className="relative mx-auto flex h-16 w-full items-center justify-between border-b-2 border-accent bg-background/20  shadow-md lg:px-8">
      <div className="flex">
        <div className="ml-8" />

        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          className="hidden text-2xl font-bold lg:flex"
        >
          {SiteConfig.title}
        </Button>
      </div>
      <nav className=" relative flex h-full items-center justify-center text-gray-600">
        <a href="/" className="header-link">
          Home
        </a>
        <a href="/about" className="header-link">
          About us
        </a>
        <a href="/newPlayer" className="header-link">
          Learn
        </a>
        <a href="/account" className="header-link mr-6">
          <LayoutDashboard />{" "}
        </a>
        <AuthButtonClient />
      </nav>
    </div>
  );
}
