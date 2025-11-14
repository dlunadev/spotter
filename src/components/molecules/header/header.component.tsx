import React, { ReactElement } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, View } from "react-native";
import { ArrowLeft, NotificationOutlined } from "@/assets/svg";
import { Colors } from "@/constants/Colors";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/atom/text/text.component";
import { Avatar } from "@/components/atom/avatar/avatar.component";

type HeaderProps = {
  title?: string;
  avatar?: boolean;
  menu?: boolean;
  edit?: boolean;
  arrow?: boolean;
  icon?: ReactElement;
  notification?: boolean;
  traslucent?: boolean;
  onPressArrow?: VoidFunction;
  onPressEdit?: VoidFunction;
  onPressMenu?: VoidFunction;
  onPressIcon?: VoidFunction;
};

export function Header(props: HeaderProps) {
  const {
    title,
    menu,
    edit,
    arrow,
    icon,
    avatar,
    notification,
    traslucent,
    onPressIcon,
    onPressArrow,
    onPressEdit,
    onPressMenu,
  } = props;
  const insets = useSafeAreaInsets();

  return (
    <HStack
      style={{
        paddingTop: insets.top + 12,
        paddingBottom: 12,
        backgroundColor: traslucent ? "transparent" : Colors.WHITE,
        position: traslucent ? "absolute" : "static",
        width: "100%",
        top: 0,
      }}
      className="items-center px-6 justify-between"
    >
      <View className="flex-row gap-2 items-center">
        {arrow && (
          <Pressable
            onPress={() => onPressArrow?.()}
            className="bg-white p-3 rounded-xl"
          >
            <ArrowLeft width={24} height={24} />
          </Pressable>
        )}

        <Text size={24} weight={400} color={Colors.BLACK}>
          {title ? title : "Spotter"}
        </Text>
      </View>
      {notification && avatar && (
        <HStack className="gap-4 items-center justify-center">
          <Pressable
            onPress={() => onPressMenu?.()}
            className="h-12 w-12 rounded-full justify-center items-center relative bg-primary-600"
          >
            {
              <NotificationOutlined
                color={Colors.BLACK}
                width={28}
                height={28}
              />
            }
          </Pressable>
          {avatar && <Avatar image={require("@/assets/images/avatar.jpg")} />}
        </HStack>
      )}
      {menu && (
        <Pressable onPress={() => onPressMenu?.()}>{/* <Menu /> */}</Pressable>
      )}
      {edit && (
        <Pressable onPress={() => onPressEdit?.()}>
          {/* <Edit width={36} height={36} /> */}
        </Pressable>
      )}
      {icon && (
        <Pressable
          onPress={() => onPressIcon?.()}
          className="bg-white p-3 rounded-xl"
        >
          {icon}
        </Pressable>
      )}
    </HStack>
  );
}
