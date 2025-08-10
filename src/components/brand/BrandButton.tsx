import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VARIANT_MAP: Record<
  "primary" | "secondary" | "outline" | "ghost" | "destructive",
  string
> = {
  primary: "btn",
  secondary: "btn btn-secondary",
  outline: "btn btn-secondary",
  ghost: "",
  destructive: "",
};

const SIZE_MAP: Record<"sm" | "md" | "lg", string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-5 py-2.5 text-base",
};

const UNDERLYING_VARIANT: Record<
  "primary" | "secondary" | "outline" | "ghost" | "destructive",
  any
> = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  destructive: "destructive",
};

const UNDERLYING_SIZE: Record<"sm" | "md" | "lg", any> = {
  sm: "sm",
  md: "default",
  lg: "lg",
};

export interface BrandButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const BrandButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  BrandButtonProps
>(({ className, variant = "primary", size = "md", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={UNDERLYING_VARIANT[variant]}
      size={UNDERLYING_SIZE[size]}
      className={cn(VARIANT_MAP[variant], SIZE_MAP[size], className)}
      {...props}
    />
  );
});
BrandButton.displayName = "BrandButton";

export default BrandButton;
