import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { Text } from '../text/text.component';
import { HStack } from '@/components/ui/hstack';
import { ButtonProps } from './button.interface';
import { styles } from './button.styles';
import { Colors } from '@/constants/Colors';

export const Button = (props: ButtonProps) => {
  const { onPress, disabled = false, style = {}, children, loading, outlined = false, icon, left_icon, right_icon, stretch = false } = props;

  const buttonStyles = [
    styles.button,
    outlined ? styles.outlined : {},
    style,
    disabled && (outlined ? styles.outlinedDisabled : styles.disabled),
    stretch
      ? { flex: 1 }
      : {
          width: '100%',
        },
  ];

  const text_color = outlined ? (disabled ? Colors.GRAY : Colors.BLACK) : Colors.WHITE;

  return (
    <Pressable onPress={onPress} style={buttonStyles} disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={text_color} />
      ) : (
        <HStack className="gap-2 justify-center items-center">
          {left_icon && icon}

          <Text size={16} weight={600} color={text_color}>
            {children}
          </Text>
          {right_icon && icon}
        </HStack>
      )}
    </Pressable>
  );
};