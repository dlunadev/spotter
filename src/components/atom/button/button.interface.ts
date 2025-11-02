import { ReactNode } from "react";
import { GestureResponderEvent } from "react-native";

export interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
  loading?: boolean;
  outlined?: boolean;
  icon?: ReactNode;
  left_icon?: boolean;
  right_icon?: boolean;
  stretch?: boolean;
  children: ReactNode;
}
