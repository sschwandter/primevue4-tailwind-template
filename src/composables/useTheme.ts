const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

export function useTheme() {
  const isDark = useDark({
    selector: "html",
    attribute: "class",
    valueDark: DARK_CLASS,
    valueLight: "",
    storageKey: STORAGE_KEY,
  });

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  return {
    isDark,
    toggleTheme,
  };
}

export { DARK_CLASS, STORAGE_KEY };
