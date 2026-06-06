import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        outline:
          "border border-border bg-transparent hover:bg-muted hover:text-foreground active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
        ghost: "hover:bg-muted hover:text-foreground active:scale-[0.98]",
        link: "text-primary",
        glow: 
          "relative bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:shadow-lg overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent before:to-primary before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        "glow-outline":
          "relative border-2 border-primary/50 bg-transparent text-foreground hover:border-highlight hover:text-highlight hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0",
        "hero":
          "relative bg-gradient-to-r from-primary via-accent to-highlight text-primary-foreground font-semibold shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/50 hover:-translate-y-1 active:translate-y-0 overflow-hidden before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r before:from-highlight before:via-accent before:to-primary before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        "hero-outline":
          "relative border-2 border-highlight/50 bg-transparent text-foreground font-semibold hover:border-highlight hover:bg-highlight/10 hover:text-highlight hover:shadow-xl hover:shadow-highlight/20 hover:-translate-y-1 active:translate-y-0",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {!asChild && variant === "hero" ? (
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
