import * as React from "react";
import { cn } from "@/lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, htmlFor, ...props }, ref) => {
    const isFormLabel = Boolean(htmlFor);

    return (
      <>
        {isFormLabel ? (
          <label
            ref={ref}
            htmlFor={htmlFor}
            className={cn(
              "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-900",
              className,
            )}
            {...props}
          >
            {children}
          </label>
        ) : (
          <span
            className={cn(
              "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-900",
              className,
            )}
          >
            {children}
          </span>
        )}
      </>
    );
  },
);
Label.displayName = "Label";

export { Label };
