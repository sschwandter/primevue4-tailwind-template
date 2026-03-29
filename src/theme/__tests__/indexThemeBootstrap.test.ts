import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

function createMatchMediaResult(matches: boolean) {
  return {
    matches,
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as MediaQueryList;
}

function loadInlineBootstrapScript() {
  const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
  const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const bootstrapScript = scriptMatches[0]?.[1];

  if (!bootstrapScript) {
    throw new Error("Theme bootstrap script not found in index.html");
  }

  return bootstrapScript;
}

function runBootstrapScript() {
  const script = loadInlineBootstrapScript()
    .replace(/__THEME_STORAGE_KEY__/g, JSON.stringify("theme"))
    .replace(/__THEME_DARK_CLASS__/g, JSON.stringify("dark"));

  window.eval(script);
}

describe("index theme bootstrap", () => {
  beforeEach(() => {
    document.documentElement.className = "";
  });

  it("applies the dark class when the stored preference is dark", () => {
    const getItem = vi.fn(() => "dark");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: { getItem },
    });
    window.matchMedia = vi.fn(() =>
      createMatchMediaResult(false),
    ) as unknown as typeof window.matchMedia;

    runBootstrapScript();

    expect(getItem).toHaveBeenCalledWith("theme");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("falls back to prefers-color-scheme when no preference is stored", () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: { getItem: vi.fn(() => null) },
    });
    window.matchMedia = vi.fn(() =>
      createMatchMediaResult(true),
    ) as unknown as typeof window.matchMedia;

    runBootstrapScript();

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("does not throw when localStorage access itself is blocked", () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new DOMException("blocked", "SecurityError");
      },
    });
    window.matchMedia = vi.fn(() =>
      createMatchMediaResult(false),
    ) as unknown as typeof window.matchMedia;

    expect(runBootstrapScript).not.toThrow();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("does not throw when getItem throws", () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: vi.fn(() => {
          throw new DOMException("blocked", "SecurityError");
        }),
      },
    });
    window.matchMedia = vi.fn(() =>
      createMatchMediaResult(false),
    ) as unknown as typeof window.matchMedia;

    expect(runBootstrapScript).not.toThrow();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
