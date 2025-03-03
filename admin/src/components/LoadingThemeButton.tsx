import React from "react";
import { Loader2 } from "lucide-react";
import ThemeButton from "./ui/ThemeButton";
import { cn } from "@/lib/utils";

export interface LoadingThemeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

const LoadingThemeButton = ({
  children,
  className,
  disabled,
  isLoading,
  ...props
}: LoadingThemeButtonProps) => {
  return (
    <ThemeButton
      className={cn("gap-3", className)}
      {...props}
      disabled={disabled ? disabled : isLoading}
    >
      {children}
      {isLoading && (
        <Loader2 size={20} className="animate-spin text-primary-foreground" />
      )}
    </ThemeButton>
  );
};

export default LoadingThemeButton;
