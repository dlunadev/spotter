import { AuthRoutes } from '@/utils/enum/routes';
import { Stack } from 'expo-router';
import React from 'react';

export default function _layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={AuthRoutes.SIGN_IN} options={{ headerShown: false }} />
        <Stack.Screen name={AuthRoutes.SIGN_UP} options={{ headerShown: false }} />
        <Stack.Screen name={AuthRoutes.RECOVERY_PASSWORD} options={{ headerShown: false }} />
        <Stack.Screen name={AuthRoutes.SEND_CODE} options={{ headerShown: false }} />
        <Stack.Screen name={AuthRoutes.RESET_PASSWORD} options={{ headerShown: false }} />
        <Stack.Screen name={AuthRoutes.SUCESS} options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
