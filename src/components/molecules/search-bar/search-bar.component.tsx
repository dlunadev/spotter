import { View, Text } from "react-native";
import React from "react";
import { Input } from "@/components/atom/input/input.component";
import { SearchIcon } from "@/components/ui/icon";
import { Colors } from "@/constants/Colors";
import { CustomInputProps } from "@/components/atom/input/input.interface";

export function SearchBar(props: CustomInputProps) {
  return (
    <View className="my-4">
      <Input
        icon={SearchIcon}
        leftIcon
        style={{
          backgroundColor: Colors.LIGHT_GRAY,
          height: 54,
          borderRadius: 24,
        }}
        {...props}
      />
    </View>
  );
}
