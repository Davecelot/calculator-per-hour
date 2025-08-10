import React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4 text-[var(--text)]", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = ({ className, ...props }) => (
  <div className={cn("mb-3", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h2 className={cn("text-lg font-bold", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardContent };
