import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../client';

const SUPABASE_TOKEN = "SPOTTER_TOKEN";

export class API_UTILS {
  static save_token = async (session: Session) => {
    const payload = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    };
    await AsyncStorage.setItem(SUPABASE_TOKEN, JSON.stringify(payload));
  };

  static get_token = async () => {
    const session = await AsyncStorage.getItem(SUPABASE_TOKEN);
    return session ? JSON.parse(session) : null;
  };

  static delete_token = async () => {
    await AsyncStorage.removeItem(SUPABASE_TOKEN);
  };

  static restore_session = async () => {
    const session = await this.get_token();
    if (session) {
      const { data } = await supabase.auth.setSession(session);
      return data.session;
    }
    return null;
  };
}