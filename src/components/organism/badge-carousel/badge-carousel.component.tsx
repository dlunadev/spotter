import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Badge } from "@/components/atom/badge/badge.component";

interface BadgeCarousel {
  spot: string[];
  active: string | null;
  loading?: boolean;
  setActive: (value: React.SetStateAction<string | null>) => void;
}

export function BadgeCarousel(props: BadgeCarousel) {
  const { spot, active, setActive } = props;

  return (
    <ScrollView
      className="grow bg-white p-4 px-6"
      contentContainerClassName="gap-2 h-7 pr-12"
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled
    >
      {spot.map((spot: string) => {
        return (
          <Badge
            {...props}
            key={spot}
            title={spot}
            onPress={() => setActive(spot)}
            active={active === spot}
          />
        );
      })}
    </ScrollView>
  );
}
