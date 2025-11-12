import { CircleIcon, EyeIcon, EyeOffIcon } from "@/assets/svg";
import React, { useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { Text } from "../text/text.component";
import { CustomInputProps } from "./input.interface";
import styles from "./input.style";
import { Colors } from "@/constants/Colors";
import {
  Input as GInput,
  InputField,
  InputIcon,
  InputSlot,
} from "@/components/ui/input";
import {
  FormControl,
  FormControlErrorIcon,
  FormControlLabel,
} from "@/components/ui/form-control";
import { scaleSize } from "@/helpers/scale-size";
import { MotiView, AnimatePresence } from "moti";

export const Input: React.FC<CustomInputProps> = (props) => {
  const {
    label,
    error,
    touched,
    size = "lg",
    stretch,
    leftIcon,
    rightIcon,
    icon,
    pressable = false,
    secureTextEntry: secureProp,
    isRequired,
    customIcon,
    style,
    onPress,
    isDisabled,
    ...rest
  } = props;
  const [secureTextEntry, setSecureTextEntry] = useState(!!secureProp);

  const borderColor = isDisabled
    ? Colors.GRAY
    : error
    ? Colors.PRIMARY
    : Colors.LIGHT_GRAY;

  const backgroundColor = isDisabled ? Colors.GRAY : Colors.WHITE;

  const InputContent = (
    <GInput
      size={size}
      variant="rounded"
      pointerEvents={pressable ? "none" : "auto"}
      isDisabled={isDisabled}
      style={[
        styles.input,
        { borderColor, backgroundColor },
        style as ViewStyle,
      ]}
    >
      {leftIcon && (
        <InputSlot className="pl-3">
          {customIcon || (icon && <InputIcon as={icon} />)}
        </InputSlot>
      )}

      <InputField
        {...rest}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={Colors.TERTIARY}
        style={{ backgroundColor, fontSize: 14, flex: 1, color: Colors.TEXT }}
        autoCapitalize={secureTextEntry ? 'none' : 'characters'}
      />

      {rightIcon && (
        <Pressable
          onPress={() => {
            secureProp && setSecureTextEntry(!secureTextEntry);
          }}
          style={[
            styles.slot,
            { justifyContent: "center", alignItems: "center" },
          ]}
          hitSlop={10}
        >
          {customIcon || (
            <InputIcon
              as={icon || (secureTextEntry ? EyeIcon : EyeOffIcon)}
              color={error ? Colors.PRIMARY : Colors.TERTIARY}
            />
          )}
        </Pressable>
      )}
    </GInput>
  );

  return (
    <FormControl isInvalid={!!error} className={stretch ? "flex-1" : ""}>
      {label && (
        <FormControlLabel className="mb-2">
          <Text
            size={scaleSize(12)}
            weight="400"
            color={error ? Colors.PRIMARY : Colors.GRAY}
          >
            {label}
          </Text>
        </FormControlLabel>
      )}

      {pressable ? (
        <Pressable onPress={onPress}>{InputContent}</Pressable>
      ) : (
        InputContent
      )}

      <AnimatePresence>
        {error && (
          <MotiView
            from={{ opacity: 0, translateY: -6 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -6 }}
            transition={{ type: "timing", duration: 350 }}
            style={{
              marginTop: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            {!isRequired && (
              <FormControlErrorIcon as={CircleIcon} color={Colors.PRIMARY} />
            )}
            <Text
              color={Colors.PRIMARY}
              size={scaleSize(12)}
              weight={300}
              className="flex-wrap flex-shrink"
            >
              {isRequired ? `*${error}` : error}
            </Text>
          </MotiView>
        )}
      </AnimatePresence>
    </FormControl>
  );
};
