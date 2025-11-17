import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "../../domain/auth/user.entity";
import { UserRepository } from "../../domain/auth/user.repository";
import { supabase } from "../../client";
import { API_UTILS } from "../../utils/shared/session_storage";

WebBrowser.maybeCompleteAuthSession();

export class SupabaseAuthAdapter implements UserRepository {
  constructor(private client: SupabaseClient) { }

  async sign_in_google() {
    const redirectTo = Linking.createURL("auth-callback");

    const { data, error } = await this.client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) throw error;

    await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  }


  async sign_in_facebook(): Promise<User> {
    const { error } = await this.client.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "spotter://auth-callback",
      },
    });

    if (error) throw error;

    const session = (await this.client.auth.getSession()).data.session;
    if (!session) throw new Error("No session returned");

    return new User(session.user.id, session.user.email ?? null);
  }

  async get_current_session(): Promise<User | null> {
    const { data } = await this.client.auth.getSession();
    if (!data.session) return null;

    const u = data.session.user;
    return new User(u.id, u.email ?? null);
  }
}

supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    API_UTILS.save_token(session);
  } else {
    API_UTILS.delete_token();
  }
});