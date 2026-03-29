import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";

interface ThemeBootstrapApi {
  applyInitialThemeClass: (options: {
    darkClass: string;
    storageKey: string;
    storage?: Pick<Storage, "getItem">;
    matchMedia: (query: string) => { matches: boolean };
    documentElement: Pick<HTMLElement, "classList">;
  }) => string | null;
  readStoredThemePreference: (
    storageKey: string,
    storage?: Pick<Storage, "getItem">,
  ) => string | null;
  shouldApplyDarkTheme: (
    storedTheme: string | null,
    prefersDark: boolean,
    darkClass: string,
  ) => boolean;
}

function loadBootstrapScript() {
  const script = readFileSync(resolve(process.cwd(), "public/theme-bootstrap.js"), "utf8");
  window.eval(script);

  return (window as unknown as { __appBootstrapTheme: ThemeBootstrapApi }).__appBootstrapTheme;
}

describe("theme bootstrap script", () => {
  it("applies the dark class when the stored preference is dark", () => {
    const bootstrap = loadBootstrapScript();
    const documentElement = document.createElement("div");
    const addSpy = vi.spyOn(documentElement.classList, "add");

    expect(
      bootstrap.applyInitialThemeClass({
        darkClass: "dark",
        storageKey: "theme",
        storage: { getItem: vi.fn(() => "dark") },
        matchMedia: vi.fn(() => ({ matches: false })),
        documentElement,
      }),
    ).toBe("dark");
    expect(addSpy).toHaveBeenCalledWith("dark");
  });

  it("falls back to prefers-color-scheme when no preference is stored", () => {
    const bootstrap = loadBootstrapScript();
    const documentElement = document.createElement("div");
    const addSpy = vi.spyOn(documentElement.classList, "add");

    expect(
      bootstrap.applyInitialThemeClass({
        darkClass: "dark",
        storageKey: "theme",
        storage: { getItem: vi.fn(() => null) },
        matchMedia: vi.fn(() => ({ matches: true })),
        documentElement,
      }),
    ).toBe("dark");
    expect(addSpy).toHaveBeenCalledWith("dark");
  });

  it("returns null when storage access throws and the system preference is light", () => {
    const bootstrap = loadBootstrapScript();
    const documentElement = document.createElement("div");
    const addSpy = vi.spyOn(documentElement.classList, "add");

    expect(
      bootstrap.applyInitialThemeClass({
        darkClass: "dark",
        storageKey: "theme",
        storage: {
          getItem: vi.fn(() => {
            throw new DOMException("blocked", "SecurityError");
          }),
        },
        matchMedia: vi.fn(() => ({ matches: false })),
        documentElement,
      }),
    ).toBeNull();
    expect(addSpy).not.toHaveBeenCalled();
  });

  it("guards direct storage reads against SecurityError", () => {
    const bootstrap = loadBootstrapScript();

    expect(
      bootstrap.readStoredThemePreference("theme", {
        getItem: vi.fn(() => {
          throw new DOMException("blocked", "SecurityError");
        }),
      }),
    ).toBeNull();
  });

  it("treats an empty stored value as a system-preference fallback", () => {
    const bootstrap = loadBootstrapScript();

    expect(bootstrap.shouldApplyDarkTheme("", true, "dark")).toBe(true);
  });
});
