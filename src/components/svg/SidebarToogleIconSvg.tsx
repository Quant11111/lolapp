import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface ArrowIconSvgProps extends ComponentPropsWithoutRef<"svg"> {
  isSidebarOpen?: boolean;
}

export const SidebarToogleIconSvg = ({
  className,
  ...props
}: ArrowIconSvgProps) => {
  return (
    <svg
      className={cn("relative w-8 h-8 fill-current text-black", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 20"
      aria-hidden="true"
      preserveAspectRatio="none"
      {...props}
    >
      {/**barre du haut du P */}
      <rect
        className={cn("transition-transform duration-300", {
          "transform translate-x-1  rotate-12": props.isSidebarOpen,
        })}
        x="0"
        y="0"
        width={props.isSidebarOpen ? "22" : "30"}
        height="4"
        rx="2"
        ry="2"
      />
      {/**barre du bas du P */}
      <rect
        className={cn("transition-transform duration-300", {
          "transform translate-x-1   -rotate-12": props.isSidebarOpen,
        })}
        x="0"
        y="8"
        width={props.isSidebarOpen ? "19" : "30"}
        height="4"
        rx="2"
        ry="2"
      />
      {/**barre verticale du P */}
      <rect
        className={cn("transition-transform duration-300", {
          "transform translate-x-8 scale-150 rotate-90": props.isSidebarOpen,
        })}
        x="0"
        y="16"
        width="30"
        height="4"
        rx="2"
        ry="2"
      />
      {/**barre 1 du A */}
      <rect
        className={cn("transition-transform duration-300", {
          "transform translate-x-7  rotate-45": props.isSidebarOpen,
        })}
        x="0"
        y="16"
        width="30"
        height="4"
        rx="2"
        ry="2"
      />
      {/**barre 2 du A */}
      <rect
        className={cn("transition-transform duration-300", {
          "transform -translate-x-4 translate-y-5  -rotate-45":
            props.isSidebarOpen,
        })}
        x="0"
        y="16"
        width={props.isSidebarOpen ? "29" : "30"}
        height="4"
        rx="2"
        ry="2"
      />
    </svg>
  );
};
