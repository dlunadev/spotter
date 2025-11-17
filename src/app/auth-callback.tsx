import { useEffect } from "react";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { supabase } from "../../sdk/client";
import { AuthRoutesLink, TabsRoutesLink } from "@/utils/enum/routes";
import { Center } from "@/components";
import { ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { API_UTILS } from "../../sdk/utils/shared/session_storage";
import { Session } from "@supabase/supabase-js";

export default function AuthCallback() {
  const url = Linking.getLinkingURL();

  useEffect(() => {
    const code = url?.split("=")[1];

    if (!code) {
      return router.replace(AuthRoutesLink.SIGN_IN);
    }

    const handleRedirect = async () => {
      const { data } = await supabase.auth.exchangeCodeForSession(code);
      if (data.session) {
        router.replace(TabsRoutesLink.HOME);
        await API_UTILS.save_token(data.session as unknown as Session);
      } else router.replace(AuthRoutesLink.SIGN_IN);
    };

    handleRedirect();
  }, [url]);

  return (
    <Center className="flex-1">
      <ActivityIndicator color={Colors.LIGHT_BLUE} />
    </Center>
  );
}
