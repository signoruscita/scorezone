import * as PopoverPrimitive from "@radix-ui/react-popover";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import {
  Popover as ShadcnPopover,
  PopoverAnchor as ShadcnPopoverAnchor,
  PopoverContent as ShadcnPopoverContent,
  PopoverTrigger as ShadcnPopoverTrigger,
} from "@/components/ui/popover";

import "./styles/retro.css";

const Popover = ShadcnPopover;

const PopoverTrigger = ShadcnPopoverTrigger;

const PopoverAnchor = ShadcnPopoverAnchor;

export const popOverVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
  },
  defaultVariants: {
    font: "retro",
  },
});

export interface BitPopoverProps
  extends React.ComponentProps<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popOverVariants> {}

function PopoverContent({
  children,
  font,
  className,
  ...props
}: BitPopoverProps) {
  return (
    <ShadcnPopoverContent
      className={cn(
        "relative bg-card border-y-6 border-foreground dark:border-ring rounded-none mt-1",
        font !== "normal" && "retro",
        className
      )}
      {...props}
    >
      {children}

      <div
        className="absolute inset-0 border-x-6 -mx-1.5 border-foreground dark:border-ring pointer-events-none"
        aria-hidden="true"
      />
    </ShadcnPopoverContent>
  );
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
