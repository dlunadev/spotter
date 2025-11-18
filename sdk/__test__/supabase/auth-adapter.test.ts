import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { SupabaseAuthAdapter } from "../../infraestructure/supabase/auth/auth.supabase.adapter";

describe("SupabaseAuthAdapter", () => {
  const mockClient: any = {
    auth: {
      signInWithOAuth: jest.fn(),
      getSession: jest.fn(),
    }
  };

  const adapter = new SupabaseAuthAdapter(mockClient);

  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("sign_in_google llama a supabase con los parámetros correctos", async () => {
    mockClient.auth.signInWithOAuth.mockResolvedValue({
      data: { url: "https://supabase-auth.com/google" },
      error: null
    });

    await adapter.sign_in_google();

    expect(mockClient.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: "spotter://auth-callback" }
    });

    expect(WebBrowser.openAuthSessionAsync).toHaveBeenCalledWith(
      "https://supabase-auth.com/google",
      "spotter://auth-callback"
    );
  });

  it("sign_in_google lanza error si supabase retorna error", async () => {
    mockClient.auth.signInWithOAuth.mockResolvedValue({
      data: null,
      error: new Error("OAuth failed")
    });

    await expect(adapter.sign_in_google()).rejects.toThrow("OAuth failed");
  });

  it("sign_in_facebook retorna un usuario válido", async () => {
    mockClient.auth.signInWithOAuth.mockResolvedValue({ error: null });
    mockClient.auth.getSession.mockResolvedValue({
      data: { session: { user: { id: "123", email: "test@mail.com" } } }
    });

    const user = await adapter.sign_in_facebook();

    expect(user.id).toBe("123");
    expect(user.email).toBe("test@mail.com");
  });

  it("sign_in_facebook lanza error si no hay sesión", async () => {
    mockClient.auth.signInWithOAuth.mockResolvedValue({ error: null });
    mockClient.auth.getSession.mockResolvedValue({
      data: { session: null }
    });

    await expect(adapter.sign_in_facebook()).rejects.toThrow(
      "No session returned"
    );
  });

  it("get_current_session devuelve null si no hay sesión", async () => {
    mockClient.auth.getSession.mockResolvedValue({
      data: { session: null }
    });

    const user = await adapter.get_current_session();
    expect(user).toBeNull();
  });
});
