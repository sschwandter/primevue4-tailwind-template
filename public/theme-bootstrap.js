(function (global) {
  function readStoredThemePreference(storageKey, storage) {
    if (!storage) {
      return null;
    }

    try {
      return storage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function shouldApplyDarkTheme(storedTheme, prefersDark, darkClass) {
    return storedTheme === darkClass || (!storedTheme && prefersDark);
  }

  function resolveInitialThemeClass(options) {
    const storedTheme = readStoredThemePreference(options.storageKey, options.storage);
    const prefersDark = options.matchMedia("(prefers-color-scheme: dark)").matches;

    return shouldApplyDarkTheme(storedTheme, prefersDark, options.darkClass)
      ? options.darkClass
      : null;
  }

  function applyInitialThemeClass(options) {
    const darkClass = resolveInitialThemeClass(options);

    if (darkClass) {
      options.documentElement.classList.add(darkClass);
    }

    return darkClass;
  }

  global.__appBootstrapTheme = {
    applyInitialThemeClass,
    readStoredThemePreference,
    resolveInitialThemeClass,
    shouldApplyDarkTheme,
  };
})(window);
