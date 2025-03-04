
import { LucideIcon } from "lucide-react";
import BlurContainer from "./BlurContainer";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  onClick?: () => void;
  layout?: "default" | "compact" | "icon-left";
  variant?: "default" | "primary" | "secondary";
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  className,
  onClick,
  layout = "default",
  variant = "default",
}: FeatureCardProps) {
  const variantClasses = {
    default: "hover:border-gray-300 dark:hover:border-gray-700",
    primary: "hover:border-sui-300 dark:hover:border-sui-700",
    secondary: "hover:border-purple-300 dark:hover:border-purple-700",
  };

  const layoutStyles = {
    default: {
      container: "text-center p-6",
      iconWrapper:
        "mx-auto mb-4 w-12 h-12 rounded-lg flex items-center justify-center",
      content: "mt-4",
    },
    compact: {
      container: "text-center p-4",
      iconWrapper:
        "mx-auto mb-3 w-10 h-10 rounded-lg flex items-center justify-center",
      content: "mt-3",
    },
    "icon-left": {
      container: "flex items-start p-5",
      iconWrapper:
        "mr-4 w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center",
      content: "",
    },
  };

  const iconBgColors = {
    default: "bg-gray-100 dark:bg-gray-800",
    primary: "bg-sui-100 dark:bg-sui-900/50",
    secondary: "bg-purple-100 dark:bg-purple-900/50",
  };

  const iconColors = {
    default: "text-gray-700 dark:text-gray-300",
    primary: "text-sui-600 dark:text-sui-400",
    secondary: "text-purple-600 dark:text-purple-400",
  };

  const styles = layoutStyles[layout];

  return (
    <BlurContainer
      className={cn(
        "transition-all duration-300 group cursor-pointer",
        variantClasses[variant],
        onClick ? "hover:shadow-lg" : "cursor-default",
        styles.container,
        className
      )}
      elevation="sm"
      backgroundOpacity="low"
      onClick={onClick}
    >
      <div
        className={cn(
          styles.iconWrapper,
          iconBgColors[variant],
          "transition-all duration-300 group-hover:scale-105"
        )}
      >
        <Icon className={cn("w-5 h-5", iconColors[variant])} />
      </div>
      <div className={styles.content}>
        <h3 className="text-lg font-medium mb-1 group-hover:text-sui-600 dark:group-hover:text-sui-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </BlurContainer>
  );
}
