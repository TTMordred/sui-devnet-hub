
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface BlurContainerProps extends HTMLAttributes<HTMLDivElement> {
  blurIntensity?: "none" | "sm" | "md" | "lg";
  backgroundOpacity?: "none" | "low" | "medium" | "high";
  borderStyle?: "none" | "light" | "medium" | "strong";
  elevation?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

const BlurContainer = forwardRef<HTMLDivElement, BlurContainerProps>(
  (
    {
      className,
      children,
      blurIntensity = "md",
      backgroundOpacity = "medium",
      borderStyle = "light",
      elevation = "md",
      rounded = "lg",
      ...props
    },
    ref
  ) => {
    const blurClasses = {
      none: "",
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
    };

    const backgroundClasses = {
      none: "bg-transparent",
      low: "bg-white/30 dark:bg-gray-900/30",
      medium: "bg-white/50 dark:bg-gray-900/50",
      high: "bg-white/80 dark:bg-gray-900/80",
    };

    const borderClasses = {
      none: "",
      light: "border border-white/20 dark:border-gray-800/30",
      medium: "border border-white/40 dark:border-gray-800/50",
      strong: "border border-white/60 dark:border-gray-800/70",
    };

    const elevationClasses = {
      none: "",
      sm: "shadow-glass-sm",
      md: "shadow-glass",
      lg: "shadow-glass-lg",
    };

    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          blurClasses[blurIntensity],
          backgroundClasses[backgroundOpacity],
          borderClasses[borderStyle],
          elevationClasses[elevation],
          roundedClasses[rounded],
          "transition-all duration-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BlurContainer.displayName = "BlurContainer";

export default BlurContainer;
