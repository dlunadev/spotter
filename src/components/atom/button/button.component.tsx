import React from "react";
import { ActivityIndicator, Pressable, TouchableOpacity } from "react-native";
import { Text } from "../text/text.component";
import { HStack } from "@/components/ui/hstack";
import { ButtonProps } from "./button.interface";
import { styles } from "./button.styles";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

export const Button = (props: ButtonProps) => {
  const {
    onPress,
    disabled = false,
    style = {},
    children,
    loading,
    outlined = false,
    icon,
    left_icon,
    right_icon,
    stretch = false,
  } = props;

  const buttonStyles = [
    styles.button,
    outlined ? styles.outlined : {},
    style,
    disabled && (outlined ? styles.outlinedDisabled : styles.disabled),
    stretch
      ? { flex: 1 }
      : {
          width: "100%",
        },
  ];

  const text_color = outlined
    ? disabled
      ? Colors.GRAY
      : Colors.BLACK
    : Colors.WHITE;

  return (
    <Pressable onPress={onPress} style={buttonStyles} disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={text_color} />
      ) : (
        <HStack className="gap-2 justify-center items-center">
          {left_icon && icon}

          <Text size={14} weight={600} color={text_color}>
            {children}
          </Text>
          {right_icon && icon}
        </HStack>
      )}
    </Pressable>
  );
};

export const ButtonGradient = (props: ButtonProps) => {
  const {
    disabled = false,
    outlined = false,
    loading,
    children,
    style,
    stretch,
    ...rest
  } = props;

  const gradientColors = disabled
    ? (["#B0B0B0", "#C9C9C9"] as const)
    : outlined
    ? (["#FFFFFF", "#FFFFFF"] as const)
    : (["#1D61E7", "#12B8FF"] as const);

  const textColor = outlined
    ? disabled
      ? Colors.GRAY
      : Colors.BLACK
    : disabled
    ? "#F0F0F0"
    : Colors.WHITE;

  const buttonStyles = [
    stretch
      ? { flex: 1 }
      : {
          width: "100%",
        },
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={[{ height: 48, opacity: disabled ? 0.7 : 1 }, ...buttonStyles, style]}
      className="rounded-[10px] overflow-hidden"
      {...rest}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.9, y: 0.5 }}
        className="flex-1 justify-center items-center"
      >
        {loading ? (
          <ActivityIndicator color={Colors.WHITE} />
        ) : (
          <Text color={textColor}>{children}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
