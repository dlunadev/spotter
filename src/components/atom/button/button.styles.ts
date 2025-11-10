import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    gap: 8
  },
  disabled: {
    backgroundColor: '#A0A0A0',
  },
  outlinedDisabled: {
    borderColor: "#000",
  },
});
