"use client";

import { SidebarToogleIconSvg } from "@/components/svg/SidebarToogleIconSvg";
import { Button } from "@/components/ui/button";
import { AuthButtonClient } from "@/features/auth/AuthButtonClient";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Sidebar = () => {
  const session = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const issidebaropen = isSidebarOpen ? "true" : "false";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-full py-7">
      <div className="h-full rounded-r-xl border-y-2 border-r-4 border-accent bg-background/20">
        <div
          className={`transition-width relative flex h-full flex-col justify-center overflow-scroll text-foreground duration-300 ${isSidebarOpen ? "w-1/6 min-w-80" : "w-0 min-w-0 pt-4"}`}
        >
          {session.data?.user ? (
            <Button variant={"default"} className="my-4">
              Connected
            </Button>
          ) : (
            <div className="flex w-full justify-center">
              <AuthButtonClient />
            </div>
          )}
        </div>
        <Button
          onClick={toggleSidebar}
          variant={"default"}
          className="fixed left-3 top-3"
          size={"icon"}
        >
          <SidebarToogleIconSvg issidebaropen={issidebaropen} />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
