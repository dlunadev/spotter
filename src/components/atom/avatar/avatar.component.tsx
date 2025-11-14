import { Avatar as GAvatar, AvatarImage } from "@/components/ui/avatar";
import { Text } from "../text/text.component";
import { ImageSourcePropType } from "react-native";

interface AvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  name?: string;
  image?: ImageSourcePropType;
  show_name?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const { size, name, image, show_name } = props;

  return (
    <GAvatar size={size}>
      {show_name && <Text>{name}</Text>}
      {image && <AvatarImage source={image} />}
    </GAvatar>
  );
};
