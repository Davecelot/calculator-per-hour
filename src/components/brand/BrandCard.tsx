import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const BrandCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, ...props }, ref) => (
  <Card ref={ref} className={cn("", className)} {...props} />
));
BrandCard.displayName = "BrandCard";

export const BrandCardHeader: React.FC<
  React.ComponentPropsWithoutRef<typeof CardHeader>
> = ({ className, ...props }) => (
  <CardHeader className={cn("", className)} {...props} />
);

export const BrandCardContent: React.FC<
  React.ComponentPropsWithoutRef<typeof CardContent>
> = ({ className, ...props }) => (
  <CardContent className={cn("", className)} {...props} />
);

export const BrandCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-4", className)} {...props} />
));
BrandCardFooter.displayName = "BrandCardFooter";

export default BrandCard;
