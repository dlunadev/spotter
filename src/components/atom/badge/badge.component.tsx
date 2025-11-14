import { Badge as GBadge, BadgeIcon } from "@/components/ui/badge";
import { Text } from "../text/text.component";
import { ReactNode } from "react";
import { Colors } from "@/constants/Colors";
import { Pressable } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";

interface Badge {
  size?: "sm" | "md" | "lg" | undefined;
  variant?: "outline" | "solid" | undefined;
  action?: "error" | "warning" | "success" | "info" | "muted" | undefined;
  title?: string;
  icon?: ReactNode;
  show_icon?: boolean;
  className?: string[] | string;
  active?: boolean | null;
  onPress?: any;
  loading?: boolean;
}

export const Badge = (props: Badge) => {
  const { title, icon: Icon, show_icon, className, loading, onPress } = props;

  return loading ? (
    <Skeleton variant="sharp" className="flex items-center rounded-full px-4 w-28" />
  ) : (
    <Pressable onPress={onPress}>
      <GBadge
        {...props}
        className={`flex items-center rounded-full px-4 ${className} ${
          props.active ? "bg-[#12B8FF]" : "bg-[#6C7278]"
        }`}
      >
        <Text color={Colors.WHITE} size={12}>
          {title}
        </Text>
        {show_icon && Icon}
      </GBadge>
    </Pressable>
  );
};
