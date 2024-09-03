import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "hover:bg-primary-dark bg-primary text-primary-foreground transition-transform hover:scale-105 hover:shadow-lg",
        destructive:
          "hover:bg-destructive-dark bg-destructive text-destructive-foreground transition-transform hover:scale-105 hover:shadow-lg",
        outline:
          "border-2 border-secondary-foreground bg-primary-foreground text-foreground transition-all duration-300 ease-in-out hover:border-primary-foreground hover:bg-foreground hover:text-primary-foreground hover:shadow-[0_0_20px_#66B2FF]",
        secondary:
          "hover:bg-secondary-dark bg-secondary text-secondary-foreground transition-transform hover:scale-105 hover:shadow-lg",
        ghost:
          "bg-transparent transition-transform hover:scale-105 hover:bg-accent hover:text-accent-foreground hover:shadow-lg",
        link: "text-primary underline-offset-4 transition-transform hover:scale-105 hover:underline",
        invert:
          "hover:bg-foreground-dark bg-foreground text-primary-foreground transition-transform hover:scale-105 hover:shadow-lg",
        success:
          "hover:bg-success-dark bg-success text-success-foreground transition-transform hover:scale-105 hover:shadow-lg",
        warning:
          "hover:bg-warning-dark bg-warning text-warning-foreground transition-transform hover:scale-105 hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = {
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
