import React, { useEffect, useState } from "react";
import {
  Badge,
  BadgeCarousel,
  BottomSheet,
  ButtonGradient,
  Calendar,
  Card,
  FavouriteIcon,
  Header,
  HStack,
  Text,
  VStack,
  Wrapper,
} from "@/components";
import { router, useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { StatusBar, View, ImageBackground } from "react-native";
import { useDimensions, useInsets } from "@/hooks";
import { Colors } from "@/constants/Colors";
import { Location, Star } from "@/assets/svg";
import { IntlParser } from "@/helpers/intl-parses";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

interface Spot extends Omit<Card, "onPress"> {
  id: string;
}

export default function Spot() {
  const { image_uri, location, price, stars, title, description, schedules } = useRoute()
    .params as Spot;
  const navigation = useNavigation();

  const [favourite, setFavourite] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const [schedule, setSchedule] = useState<string | null>(null);

  const { top, bottom } = useInsets();
  const { screen_dimensions } = useDimensions();
  const { height } = screen_dimensions;

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        !bookModal && (
          <Header
            title=" "
            arrow
            onPressArrow={() => router.back()}
            traslucent
            icon={
              <FavouriteIcon
                width={24}
                height={24}
                color={favourite ? Colors.PRIMARY : Colors.BLACK}
                fill={favourite ? Colors.PRIMARY : Colors.WHITE}
              />
            }
            onPressIcon={() => setFavourite(!favourite)}
          />
        ),
    });
  }, [navigation, favourite, bookModal]);

  const parsed_schedules = JSON.parse(schedules as string);

  return (
    <View className="flex-1 bg-white">
      <StatusBar animated barStyle="light-content" translucent />

      {/* @TODO Esto deberia ser un carrusel, donde se puedan ver todas las imagenes, creo, despues lo vemos */}
      <ImageBackground
        source={image_uri}
        className="w-full"
        style={{ paddingTop: top, height: height / 2.5 }}
        imageClassName="rounded-b-3xl"
      >
        <View className="justify-end items-end flex-1 pb-16">
          <View
            className="py-6 px-3 rounded-l-lg"
            style={{ backgroundColor: "#00000085" }}
          >
            <Text size={14} color={Colors.WHITE}>
              {IntlParser(price)} / {"\n"}
              {"   "}Hour
            </Text>
          </View>
        </View>
      </ImageBackground>
      <Wrapper padding={false} className="mt-8">
        <View className="flex-1">
          <VStack className="px-6">
            <Text size={28}>{title}</Text>
            <HStack className="justify-between items-center mt-4">
              <View className="gap-2 items-center flex-row">
                <Location color={Colors.GRAY} />
                <Text color={Colors.GRAY}>{location}</Text>
              </View>
              <View className="gap-2 items-center flex-row">
                <Text>{stars}</Text>
                <Star color={Colors.YELLOW} />
              </View>
            </HStack>
          </VStack>
          <VStack className="mt-6">
            <Text weight={600} className="px-6">
              Amenities
            </Text>
            <ScrollView horizontal contentContainerClassName="gap-2 my-2 px-6">
              <View className="px-6 py-4 bg-[#EDF1F3] rounded-md ">
                <Text>Wi-Fi</Text>
              </View>
              <View className="px-6 py-4 bg-[#EDF1F3] rounded-md ">
                <Text>Aire acondicionado</Text>
              </View>
              <View className="px-6 py-4 bg-[#EDF1F3] rounded-md ">
                <Text>Otras giladas</Text>
              </View>
              <View className="px-6 py-4 bg-[#EDF1F3] rounded-md ">
                <Text>Gilada de relleno</Text>
              </View>
            </ScrollView>
          </VStack>
          <VStack className="gap-4 p-6">
            <Text weight={600}>About</Text>
            <Text>{description}</Text>
          </VStack>
        </View>
        <View className="px-6">
          <ButtonGradient onPress={() => setBookModal(true)}>
            Reservar
          </ButtonGradient>
        </View>
      </Wrapper>
      <BottomSheet
        snapPoints={["85"]}
        isOpen={bookModal}
        setIsOpen={setBookModal}
      >
        <KeyboardAwareScrollView
          className="flex-1"
          contentContainerClassName="grow"
          bottomOffset={120}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <View className="flex-1">
            <VStack className="flex-1 px-6 gap-4">
              <Calendar />
              <View className="p-6 py-8 gap-4 bg-white rounded-3xl">
                <Text size={16} weight={600}>Horarios disponibles</Text>
                <HStack className="flex-wrap gap-2">
                  {parsed_schedules.map((item: string) => (
                    <Badge title={item} active={schedule === item} onPress={() => setSchedule(item)} key={item} />
                  ))}
                </HStack>
              </View>
            </VStack>

            {/**
             * @todo El boton deberia de ser un slide que te redirije a Mercado Pago
             */}

            <HStack className="w-full p-6 gap-4 justify-between bg-[#ffffff90]" style={{paddingBottom: bottom + 12}}>
              <View className="flex-col gap-1 w-2/5">
                <Text size={12} weight={200}>Total:</Text>
                <Text size={18} weight={600}>{IntlParser(price)}</Text>
              </View>
              <ButtonGradient onPress={() => {}} stretch>
                Reservar Ahora
              </ButtonGradient>
            </HStack>
          </View>
        </KeyboardAwareScrollView>
      </BottomSheet>
    </View>
  );
}
