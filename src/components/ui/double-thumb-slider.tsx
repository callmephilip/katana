"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "slider-root relative flex w-full touch-none select-none items-center border-2 border-h",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      onClick={(e) => {
        e.stopPropagation();
        //alert("Track clicked");
      }}
      className="relative h-24 w-full grow overflow-hidden"
    >
      <SliderPrimitive.Range className="absolute h-full border-2 border-indigo-600" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="slider-thumb block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="slider-thumb block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
