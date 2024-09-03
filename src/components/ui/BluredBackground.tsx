import React from "react";
import { cn } from "@/lib/utils";

type BlurredBackgroundProps = {
  imageUrl: string;
  className?: string;
};

export const BlurredBackground: React.FC<BlurredBackgroundProps> = ({
  imageUrl,
  className,
}) => {
  return (
    <div
      className={cn("fixed inset-0 z-[-1] overflow-hidden", className)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(5px) brightness(0.8)",
      }}
    />
  );
};
