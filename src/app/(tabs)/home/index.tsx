import React, { useEffect, useState } from "react";
import { BadgeCarousel, Card, Header, SearchBar, Text, VStack, Wrapper,} from "@/components";
import { router, useNavigation } from "expo-router";
import { spot, spot_mocks } from "@/constants/spots";
import { FlatList } from "react-native-gesture-handler";
import { HomeRoutesLink } from "@/utils/enum/routes";

export default function Home() {
  const navigation = useNavigation();
  const [active, setActive] = useState<string | null>("Futbol");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header avatar notification />,
    });
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2500);
  }, [])
  

  return (
    <Wrapper padding={false}>
      <VStack className="px-6">
        <Text size={24} weight="900">
          Descubri Nuevas {"\n"}Canchas!
        </Text>
        <SearchBar placeholder="Search place..." />
      </VStack>

      <FlatList
        data={spot_mocks}
        className="mb-36"
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2 px-6"
        renderItem={({ item }) => <Card {...item} loading={loading} onPress={() => router.push({
          pathname: HomeRoutesLink.SPOT,
          params: {
            id: new Date().toString(),
            ...item,
            schedules: JSON.stringify(item.schedules),
          },
          
        })} />}
        keyExtractor={(_, i) => `${_.title}-${i}`}
        numColumns={2}
        ListHeaderComponent={() => <BadgeCarousel spot={spot} active={active} setActive={setActive} loading={loading} />}
        stickyHeaderHiddenOnScroll={false}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        alwaysBounceVertical={false}
        contentContainerStyle={{
          paddingBottom: 100
        }}
      />
    </Wrapper>
  );
}
