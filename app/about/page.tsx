"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const [language, setLanguage] = useState("en");
  const side = language === "en" ? "left" : "right";

  return (
    <div className="relative flex h-20 w-full items-center justify-around space-x-4">
      <div className={`absolute h-full w-1/2 ${side}-0  bg-white`} />
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          setLanguage("en");
        }}
        className="z-20 flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 30"
          width="30"
          height="20"
        >
          <clipPath id="t">
            <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
          </clipPath>
          <path d="M0,0v30h50v-30z" fill="#012169" />
          <path d="M0,0 50,30M50,0 0,30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0,0 50,30M50,0 0,30"
            clipPath="url(#t)"
            stroke="#C8102E"
            strokeWidth="4"
          />
          <path
            d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z"
            fill="#C8102E"
            stroke="#FFF"
            strokeWidth="2"
          />
        </svg>
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          setLanguage("fr");
        }}
        className="z-20 flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20">
          <rect width="30" height="20" fill="#ED2939" />
          <rect width="20" height="20" fill="#fff" />
          <rect width="10" height="20" fill="#002395" />
        </svg>
      </Button>
    </div>
  );
}
