
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface AnimatedGradientProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "blue" | "purple" | "cyan";
  intensity?: "subtle" | "medium" | "strong";
}

export default function AnimatedGradient({
  className,
  variant = "blue",
  intensity = "medium",
  ...props
}: AnimatedGradientProps) {
  const gradientClasses = {
    blue: {
      subtle: "from-blue-50/40 via-blue-100/40 to-blue-50/40 dark:from-blue-900/10 dark:via-blue-800/10 dark:to-blue-900/10",
      medium: "from-blue-100/50 via-blue-200/50 to-blue-100/50 dark:from-blue-900/20 dark:via-blue-800/20 dark:to-blue-900/20",
      strong: "from-blue-200/60 via-blue-300/60 to-blue-200/60 dark:from-blue-800/30 dark:via-blue-700/30 dark:to-blue-800/30"
    },
    purple: {
      subtle: "from-purple-50/40 via-purple-100/40 to-purple-50/40 dark:from-purple-900/10 dark:via-purple-800/10 dark:to-purple-900/10",
      medium: "from-purple-100/50 via-purple-200/50 to-purple-100/50 dark:from-purple-900/20 dark:via-purple-800/20 dark:to-purple-900/20",
      strong: "from-purple-200/60 via-purple-300/60 to-purple-200/60 dark:from-purple-800/30 dark:via-purple-700/30 dark:to-purple-800/30"
    },
    cyan: {
      subtle: "from-cyan-50/40 via-cyan-100/40 to-cyan-50/40 dark:from-cyan-900/10 dark:via-cyan-800/10 dark:to-cyan-900/10",
      medium: "from-cyan-100/50 via-cyan-200/50 to-cyan-100/50 dark:from-cyan-900/20 dark:via-cyan-800/20 dark:to-cyan-900/20",
      strong: "from-cyan-200/60 via-cyan-300/60 to-cyan-200/60 dark:from-cyan-800/30 dark:via-cyan-700/30 dark:to-cyan-800/30"
    }
  };

  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-r animated-gradient -z-10 pointer-events-none",
        gradientClasses[variant][intensity],
        className
      )}
      {...props}
    />
  );
}
