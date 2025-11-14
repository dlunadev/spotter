import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

export interface Tabbar {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: any;
  insets: any;
};
