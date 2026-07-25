import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none font-sans",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white border-[3px] border-blue-900 shadow-comic hover:bg-blue-400 hover:shadow-comic-hover hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        secondary:
          "bg-blue-200 text-blue-900 border-[3px] border-blue-900 shadow-comic hover:bg-blue-50 hover:shadow-comic-hover hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        outline:
          "border-[3px] border-blue-900 bg-white text-blue-900 hover:bg-blue-50",
        ghost: "text-blue-900 hover:text-blue-600",
        ghost_danger: "text-blue-900 hover:text-red-500",
        ghost_quirky: "text-blue-900 hover:text-yellow-500",
        danger:
          "bg-[var(--color-oops)] text-white border-[3px] border-blue-900 shadow-comic hover:bg-red-400 hover:shadow-comic-hover hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        quirky:
          "bg-[var(--color-quirky)] text-blue-900 border-[3px] border-blue-900 shadow-comic hover:bg-yellow-300 hover:shadow-comic-hover hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",

        "default-tiny":
          "bg-blue-600 text-white border-[3px] border-blue-900 shadow-comic-hover hover:bg-blue-400 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95",
        "white-tiny":
          "bg-white text-blue-900 border-[3px] border-blue-900 shadow-comic-hover hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95",
        "secondary-tiny":
          "bg-blue-200 text-blue-900 border-[3px] border-blue-900 shadow-comic-hover hover:bg-blue-50 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95",
        "quirky-tiny":
          "bg-[var(--color-quirky)] text-blue-900 border-[3px] border-blue-900 shadow-comic-hover hover:bg-yellow-300 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95",

        glass:
          "relative bg-blue-300/30 text-blue-900/70 border-2 border-blue-900 shadow-[2px_2px_0px_0px_var(--color-blue-900)] hover:bg-blue-300/60 backdrop-blur-md hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95",
        "glass-clear":
          "relative bg-white/30 text-blue-900/70 border-2 border-blue-900 shadow-[2px_2px_0px_0px_var(--color-blue-900)] hover:bg-white/60 backdrop-blur-md hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95",
        "glass-quirky":
          "relative bg-[var(--color-quirky)]/30 text-blue-900 border-2 border-blue-900 shadow-[2px_2px_0px_0px_var(--color-blue-900)] hover:bg-yellow-300/60 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
        icon: "h-12 w-12",

        circle: "h-12 w-12 p-0",
        "circle-sm": "h-10 w-10 p-0 text-sm",
        "circle-lg": "h-16 w-16 p-0 text-xl",

        "circle-auto": "h-12 w-12 md:px-6 md:w-auto p-0",
        "circle-sm-auto": "h-10 w-10 p-0 md:px-4 md:w-auto text-sm",
        "circle-lg-auto": "h-16 w-16 p-0 md:px-8 md:w-auto text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    
    const Comp = asChild ? (props.children as React.ReactElement).type : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
