import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { SupabaseAuthAdapter } from "../../sdk/infraestructure/auth/auth.supabase.adapter";
import { supabase } from "../../sdk/client";
import { AuthServices } from "../../sdk/services/auth/auth.service";
import { User } from "../../sdk/domain/auth/user.entity";
import { router } from "expo-router";
import { AuthRoutesLink, TabsRoutesLink } from "@/utils/enum/routes";
import { API_UTILS } from "../../sdk/utils/shared/session_storage";
import { Session } from "@supabase/supabase-js";

const repo = new SupabaseAuthAdapter(supabase);
const auth_service = new AuthServices(repo);

interface AuthContextType {
  user: User | null;
  initializing: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      const session = await auth_service.get_current_session();

      if (session) {
        setUser(new User(session.id, session.email ?? null));
        router.replace(TabsRoutesLink.HOME);
      }

      const { data: listener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            const user = new User(session.user.id, session.user.email ?? null);
            setUser(user);

            API_UTILS.save_token(session.access_token as unknown as Session);
          } else {
            setUser(null);
            API_UTILS.delete_token();
            router.replace(AuthRoutesLink.SIGN_IN);
          }
        }
      );

      setInitializing(false);

      return () => listener.subscription.unsubscribe();
    };

    init();
  }, []);

  const signInWithGoogle = async () => {
    await auth_service.sign_in_google();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, initializing, signInWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
