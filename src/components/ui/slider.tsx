import * as React from "react"

export interface SliderProps extends React.ComponentProps<"input"> {}

export function Slider({ className, ...props }: SliderProps) {
  return (
    <input
      type="range"
      className={className}
      {...props}
    />
  )
}
