import { View, Pressable, Platform, StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import { Text } from "../text/text.component";
import { Tabbar } from "./tabbar.interface";
import { Colors } from "@/constants/Colors";

export const TabBar = (props: Tabbar) => {
  const { state, descriptors, navigation } = props;

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.dispatch(
              CommonActions.navigate({
                name: route.name,
              })
            );
          }
        };

        return (
          <Pressable
            key={route.key}
            style={[
              styles.tabItem,
              route.name === "index" && styles.indexTabItem,
            ]}
            onPress={onPress}
          >
            <View>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: isFocused ? "#FF6347" : "#333",
                  focused: isFocused,
                  size: 0,
                })}
            </View>
            {isFocused && (
              <Text size={14} style={[isFocused && styles.focusedText]}>
                {String(options.title) || route.name}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    position: "absolute",
    bottom: Platform.OS === "ios" ? 32 : 32,
    left: 10,
    right: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    height: 64,
    marginHorizontal: 10
  },
  tabItem: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    position: "relative",
  },
  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  focusedTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#FF6347",
    position: "absolute",
    bottom: -19,
    width: "100%",
  },
  focusedText: {
    color: Colors.PRIMARY,
  },
  indexTabItem: {
    transform: [{ translateY: -30 }],
    backgroundColor: Colors.WHITE,
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});
