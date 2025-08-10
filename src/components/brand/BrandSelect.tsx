import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const BrandSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectTrigger>
>(({ className, ...props }, ref) => (
  <SelectTrigger ref={ref} className={cn(className)} {...props} />
));
BrandSelectTrigger.displayName = "BrandSelectTrigger";

const BrandSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectContent>,
  React.ComponentPropsWithoutRef<typeof SelectContent>
>(({ className, ...props }, ref) => (
  <SelectContent ref={ref} className={cn(className)} {...props} />
));
BrandSelectContent.displayName = "BrandSelectContent";

const BrandSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectItem>,
  React.ComponentPropsWithoutRef<typeof SelectItem>
>(({ className, ...props }, ref) => (
  <SelectItem ref={ref} className={cn(className)} {...props} />
));
BrandSelectItem.displayName = "BrandSelectItem";

const BrandSelectValue = SelectValue;

const BrandSelect = Select as typeof Select & {
  Trigger: typeof BrandSelectTrigger;
  Content: typeof BrandSelectContent;
  Item: typeof BrandSelectItem;
  Value: typeof BrandSelectValue;
};

BrandSelect.Trigger = BrandSelectTrigger;
BrandSelect.Content = BrandSelectContent;
BrandSelect.Item = BrandSelectItem;
BrandSelect.Value = BrandSelectValue;

export { BrandSelect };
