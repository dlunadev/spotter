import { HStack } from "@/components/ui/hstack";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Calendar as RNCalendar } from "react-native-calendars";
import { Text } from "../text/text.component";
import { ArrowLeft, ArrowRight } from "@/assets/svg";
import { View } from "react-native";

export function Calendar() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  return (
    <RNCalendar
      style={{ borderRadius: 24, flex: 1, height: 350 }}
      current={new Date().toDateString()}
      minDate={new Date().toDateString()}
      onDayPress={(day) => {
        setSelectedDate(day.dateString);
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: "#12B8FF",
        },
      }}

      theme={{
        selectedDayBackgroundColor: "#12B8FF",
        selectedDayTextColor: "#fff",
        todayTextColor: "#12B8FF",
        arrowColor: "#4CAF50",
        contentStyle: { borderRadius: 24 },
        stylesheet: {
          calendar: {
            main: {
              borderRadius: 24,
            },
          },
        },
        backgroundColor: Colors.PRIMARY,
      }}
      hideArrows
      enableSwipeMonths
      customHeader={() => (
        <HStack className="py-6 px-4 justify-between items-center">
          <View className="flex-row items-center gap-2">
            <Text size={16} weight={600}>Agosto</Text>
            <Text size={16} weight={600}>{new Date().getFullYear().toString()}</Text>
          </View>
          <View className="flex-row gap-2 items-center">
            <ArrowLeft width={22} height={22} />
            <ArrowRight width={22} height={22} />
          </View>
        </HStack>
      )}
    />
  );
}
