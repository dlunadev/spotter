import { Badge as GBadge, BadgeIcon } from "@/components/ui/badge";
import { Text } from "../text/text.component";
import { ReactNode } from "react";

interface BadgeProps {
  size?: "sm" | "md" | "lg" | undefined;
  variant?: "outline" | "solid" | undefined;
  action?: "error" | "warning" | "success" | "info" | "muted" | undefined;
  title?: string;
  icon?: ReactNode;
  show_icon?: boolean;
}

export const Badge = (props: BadgeProps) => {
  const { size = "md", variant = "outline", action, title, icon: Icon, show_icon } = props;

  return (
    <GBadge size={size} variant={variant} action={action}>
      <Text>{title}</Text>
      {show_icon && Icon}
    </GBadge>
  );
};
