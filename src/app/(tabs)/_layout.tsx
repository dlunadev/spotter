import React from "react";
import { StatusBar } from "react-native";
import { Tabs } from "expo-router";
import { TabsRoutes } from "@/utils/enum/routes";
import { TabBar } from "@/components/atom/tabbar/tabbar.component";
import { Home, Profile } from "@/assets/svg";

export default function TabLayout() {
  return (
    <>
      <StatusBar animated barStyle="dark-content" translucent />
      <Tabs
        tabBar={(props) => {
          return <TabBar {...props} />;
        }}
      >
        <Tabs.Screen
          name={TabsRoutes.HOME}
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => <Home />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, focused }) => <Profile />,
          }}
        />
      </Tabs>
    </>
  );
}
