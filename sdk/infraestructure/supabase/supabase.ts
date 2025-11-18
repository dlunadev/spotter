import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'
import 'react-native-get-random-values'
import { API_UTILS } from '../../utils/shared/session_storage';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
      persistSession: true,
      storage: AsyncStorage,
      detectSessionInUrl: false,
    },
  }
);


supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    API_UTILS.save_token(session);
  } else {
    API_UTILS.delete_token();
  }
});