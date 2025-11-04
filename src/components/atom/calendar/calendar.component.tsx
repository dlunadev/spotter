import React, { useState } from "react";
import { CalendarList } from "react-native-calendars";

export function Calendar() {
  const today = new Date();
  const sixteenYearsAgo = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );

  const formattedDate = sixteenYearsAgo.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(formattedDate);

  return (
    <CalendarList
      horizontal
      pagingEnabled
      current={formattedDate}
      pastScrollRange={200}
      futureScrollRange={0}
      onDayPress={(day) => {
        setSelectedDate(day.dateString);
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: "#4CAF50",
        },
      }}
      theme={{
        calendarBackground: "#fff",
        textSectionTitleColor: "#555",
        selectedDayBackgroundColor: "#4CAF50",
        selectedDayTextColor: "#fff",
        todayTextColor: "#4CAF50",
        arrowColor: "#4CAF50",
      }}
    />
  );
}
