import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface BrandInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {}

export const BrandInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  BrandInputProps
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn("px-3 py-2 rounded-md", className)}
    {...props}
  />
));
BrandInput.displayName = "BrandInput";

export default BrandInput;
