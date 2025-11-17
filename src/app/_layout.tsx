import "../../global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { SWRConfig } from "swr";

import "@/i18n/i18n";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import * as WebBrowser from "expo-web-browser";

import { AuthProvider, useAuth } from "@/context/auth.context";

WebBrowser.maybeCompleteAuthSession();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  return (
    <KeyboardProvider>
      <RootLayoutNav loaded={loaded} />
    </KeyboardProvider>
  );
}

function RootLayoutNav({ loaded }: { loaded: boolean }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        shouldRetryOnError: false,
        dedupingInterval: 5000,
      }}
    >
      <AuthProvider>
        <AppContent loaded={loaded} />
      </AuthProvider>
    </SWRConfig>
  );
}

function AppContent({ loaded }: { loaded: boolean }) {
  const { initializing, user } = useAuth();

  useEffect(() => {
    if (loaded && !initializing) SplashScreen.hideAsync();
  }, [loaded, initializing]);

  if (!loaded && initializing) return null;

  return (
    <GluestackUIProvider mode="dark">
      <GestureHandlerRootView className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Protected guard={!!user}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Screen name="auth-callback" />
        </Stack>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
