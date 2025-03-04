
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import BlurContainer from "./BlurContainer";
import AnimatedGradient from "./AnimatedGradient";

interface HeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
  gradient?: "blue" | "purple" | "cyan";
  gradientIntensity?: "subtle" | "medium" | "strong";
  align?: "center" | "left";
  size?: "sm" | "md" | "lg";
  hasBackground?: boolean;
}

export default function Hero({
  title,
  subtitle,
  children,
  className,
  gradient = "blue",
  gradientIntensity = "medium",
  align = "center",
  size = "md",
  hasBackground = true,
}: HeroProps) {
  const alignmentClasses = {
    center: "text-center items-center",
    left: "text-left items-start",
  };

  const titleSizes = {
    sm: "text-2xl sm:text-3xl md:text-4xl",
    md: "text-3xl sm:text-4xl md:text-5xl",
    lg: "text-4xl sm:text-5xl md:text-6xl",
  };

  const subtitleSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const containerSizes = {
    sm: "py-10 max-w-3xl",
    md: "py-16 max-w-4xl",
    lg: "py-20 max-w-5xl",
  };

  return (
    <div className={cn("relative z-0", className)}>
      {hasBackground && (
        <AnimatedGradient
          variant={gradient}
          intensity={gradientIntensity}
          className="rounded-3xl mx-auto"
        />
      )}
      <div
        className={cn(
          "flex flex-col gap-4",
          alignmentClasses[align],
          containerSizes[size]
        )}
      >
        <div className="space-y-4 relative z-10">
          <h1
            className={cn(
              "font-bold tracking-tight text-gray-900 dark:text-white",
              titleSizes[size]
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "max-w-2xl text-gray-600 dark:text-gray-300",
                subtitleSizes[size],
                align === "center" ? "mx-auto" : ""
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}
