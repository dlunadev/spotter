import { View } from "react-native";
import React, { ReactElement } from "react";
import { useInsets } from "@/hooks";

export function Wrapper({
  children,
  className,
  padding = true,
}: {
  children: ReactElement | ReactElement[];
  className?: string;
  padding?: boolean;
}) {
  const { top, bottom } = useInsets();

  return (
    <View
      style={{
        paddingTop: padding ? top : 0,
        paddingBottom: bottom + 16,
      }}
      className={`${className} ${padding ? "p-6" : ""} grow bg-white`}
    >
      {children}
    </View>
  );
}
