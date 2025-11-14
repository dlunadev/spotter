import { View, ImageBackground, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Badge } from "@/components/atom/badge/badge.component";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/atom/text/text.component";
import { VStack } from "@/components/ui/vstack";
import { Location, Star } from "@/assets/svg";
import { IntlParser } from "@/helpers/intl-parses";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export interface Card {
  title: string;
  location: string;
  stars: number;
  price: number;
  image_uri: any;
  description?: string;
  schedules?: string | string[];
  loading?: boolean;
  onPress?: () => void;
}

export function Card(props: Card) {
  const { location, price, stars, title, image_uri, loading, onPress } = props;
  return loading ? (
    <Skeleton variant="sharp" className="flex-1 min-h-64 p-4 rounded-2xl" />
  ) : (
    <TouchableWithoutFeedback onPress={onPress}>
      <ImageBackground
        source={image_uri}
        className="flex-1 min-h-64 p-4 justify-between"
        imageStyle={{
          borderRadius: 16,
        }}
      >
        <HStack className="justify-between items-center">
          <Text color={Colors.WHITE}>IC</Text>
          <Badge title={`${IntlParser(price)}`} />
        </HStack>
        <VStack className="gap-2">
          <HStack className="rounded-full px-1 items-center gap-1 justify-start flex-row w-14 bg-white">
            <Star color={Colors.YELLOW} width={14} height={14} />
            <Text color={Colors.BLACK} weight="600" size={12}>
              {stars}
            </Text>
          </HStack>
          <View>
            <Text color={Colors.WHITE}>{title}</Text>
            <HStack className="gap-1 items-start">
              <Location
                color={Colors.LIGHT_GRAY}
                style={{ marginTop: 4 }}
                width={12}
                height={12}
              />
              <Text color={Colors.LIGHT_GRAY} weight={"100"} size={12}>
                {location}
              </Text>
            </HStack>
          </View>
        </VStack>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
