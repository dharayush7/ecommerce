import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const ThemeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "w-full bg-primary text-primary-foreground py-2 cursor-pointer hover:translate-x-1.5 duration-200 ease-in flex justify-center items-center disabled:bg-muted-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ThemeButton.displayName = "Button";

export default ThemeButton;
