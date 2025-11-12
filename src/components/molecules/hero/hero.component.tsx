import { View } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fab } from "@/components/ui/fab";
import { ArrowNarrowLeft } from "@/assets/svg";
import { Router, router } from "expo-router";
import { Text } from "@/components/atom/text/text.component";
import { Colors } from "@/constants/Colors";
import { AuthRoutesLink } from "@/utils/enum/routes";
import { useDimensions, useInsets } from "@/hooks";

interface Hero {
  title: string;
  subtitle?: string;
  route_to?: string;
  redirect_to?: () => void;
}

export function Hero(props: Hero) {
  const { title, subtitle, route_to, redirect_to } = props;
  const { top } = useInsets();
  const { screen_dimensions } = useDimensions();
  const { height } = screen_dimensions;

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      className="bg-[#0D0D1B] w-full"
      style={{ paddingTop: top, height: height / 3 }}
    >
      <LinearGradient
        colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0)"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        className="absolute inset-0"
      />

      <View className="flex-1 justify-between pb-6">
        <View className="mt-4">
          <Fab
            placement="top left"
            className="bg-transparent active:bg-transparent"
            onPress={() => router.back()}
          >
            <ArrowNarrowLeft width={32} height={32} />
          </Fab>
        </View>

        <View className="px-6 py-4 gap-2">
          {title && (
            <Text size={32} color={Colors.WHITE}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text size={14} color={Colors.WHITE}>
              {subtitle}{" "}
              <Text color={Colors.BLUE} onPress={redirect_to}>
                {route_to}
              </Text>
            </Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
