jest.mock("expo-constants", () => ({
  __esModule: true,
  default: {
    manifest: {
      scheme: "spotter",
    },
    expoConfig: {
      scheme: "spotter",
    }
  },
}));

jest.mock("expo-linking", () => ({
  __esModule: true,
  ...jest.requireActual("expo-linking"),
  createURL: jest.fn((path) => `spotter://${path}`),
}));

jest.mock("expo-web-browser", () => ({
  __esModule: true,
  openAuthSessionAsync: jest.fn(),
  maybeCompleteAuthSession: jest.fn(),
}));
