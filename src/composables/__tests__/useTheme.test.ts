import { ref } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { useDarkMock } = vi.hoisted(() => ({
  useDarkMock: vi.fn(),
}));

vi.mock("@vueuse/core", () => ({
  useDark: useDarkMock,
}));

describe("useTheme", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("configures useDark with the app theme constants", async () => {
    const isDark = ref(false);
    useDarkMock.mockReturnValue(isDark);

    const { useTheme, THEME_DARK_CLASS, THEME_STORAGE_KEY } = await import("../useTheme");

    useTheme();

    expect(useDarkMock).toHaveBeenCalledWith({
      selector: "html",
      attribute: "class",
      valueDark: THEME_DARK_CLASS,
      valueLight: "",
      storageKey: THEME_STORAGE_KEY,
    });
  });

  it("toggles the theme ref in both directions", async () => {
    const isDark = ref(false);
    useDarkMock.mockReturnValue(isDark);

    const { useTheme } = await import("../useTheme");
    const theme = useTheme();

    theme.toggleTheme();
    expect(theme.isDark.value).toBe(true);

    theme.toggleTheme();
    expect(theme.isDark.value).toBe(false);
  });
});
