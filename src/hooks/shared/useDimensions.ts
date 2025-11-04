import { Dimensions } from "react-native"


export const useDimensions = () => {
  const screen_dimensions = Dimensions.get("screen");
  const window_dimensions = Dimensions.get("window");

  return {
    screen_dimensions,
    window_dimensions
  }
}