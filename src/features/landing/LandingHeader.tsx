"use client";

import { SiteConfig } from "@/site-config";
import { AuthButtonClient } from "../auth/AuthButtonClient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Home, LayoutDashboard } from "lucide-react";

export function LandingHeader() {
  const router = useRouter();
  return (
    <div className="fixed z-40 flex h-16 w-full items-center justify-around border-b-2 border-accent bg-black/70 pl-16  shadow-md lg:justify-between ">
      <Button
        onClick={() => router.push("/")}
        variant="ghost"
        className="hidden text-2xl font-bold lg:flex"
      >
        {SiteConfig.title}
      </Button>
      <nav className=" relative flex h-full items-center justify-center text-gray-600">
        <a href="/about" className="hidden-header-link ">
          About
        </a>
        <a href="/newPlayer" className="hidden-header-link ">
          Learn
        </a>
        <a href="/" className="header-link hidden">
          <Home />
        </a>
        <a href="/account" className="header-link">
          <LayoutDashboard />{" "}
        </a>
        <div className="header-link pr-2">
          <AuthButtonClient />
        </div>
      </nav>
    </div>
  );
}
