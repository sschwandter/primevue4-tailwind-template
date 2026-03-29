import { THEME_DARK_CLASS, THEME_STORAGE_KEY } from "@/theme/constants";

export function useTheme() {
  const isDark = useDark({
    selector: "html",
    attribute: "class",
    valueDark: THEME_DARK_CLASS,
    valueLight: "",
    storageKey: THEME_STORAGE_KEY,
  });

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  return {
    isDark,
    toggleTheme,
  };
}

export { THEME_DARK_CLASS, THEME_STORAGE_KEY };
