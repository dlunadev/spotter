import {
  Avatar as GAvatar,
  AvatarImage,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Text } from "../text/text.component";

interface AvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  name?: string;
  image?: string;
  show_name?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const { size, name, image, show_name } = props;

  return (
    <GAvatar size={size}>
      {show_name && <Text>{ name }</Text>}
      <AvatarImage
        source={{
          uri: image,
        }}
      />
      <AvatarBadge />
    </GAvatar>
  );
};
