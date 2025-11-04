import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: "#000",
  },
  disabled: {
    backgroundColor: '#A0A0A0',
  },
  outlinedDisabled: {
    borderColor: "#000",
  },
});
