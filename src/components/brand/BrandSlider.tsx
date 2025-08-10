import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export interface BrandSliderProps
  extends React.ComponentPropsWithoutRef<typeof Slider> {}

export const BrandSlider = React.forwardRef<
  React.ElementRef<typeof Slider>,
  BrandSliderProps
>(({ className, ...props }, ref) => (
  <Slider ref={ref} className={cn("w-full", className)} {...props} />
));
BrandSlider.displayName = "BrandSlider";

export default BrandSlider;
