
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
    barColor?: string;
    trackColor?: string;
  }
>(({ className, value, indicatorClassName, barColor, trackColor, ...props }, ref) => {
  // Calculate dynamic color classes based on value
  const getAutomaticColorClass = () => {
    if (!value) return "bg-primary";
    if (value < 25) return "bg-red-500";
    if (value < 50) return "bg-yellow-500";
    if (value < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full",
        trackColor || "bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          barColor || getAutomaticColorClass(),
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
