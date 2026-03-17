import { describe, it, expect } from "vitest";
import { themes } from "../constants/themes";
import { defaults } from "../constants/defaults";

describe("themes", () => {
  it("has at least 5 predefined themes", () => {
    expect(themes.length).toBeGreaterThanOrEqual(5);
  });

  it("each theme has required fields", () => {
    for (const theme of themes) {
      expect(theme.name).toBeTruthy();
      expect(theme.background).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(theme.foreground).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(theme.ref).toBeTruthy();
      // Palette 0-15
      for (let i = 0; i < 16; i++) {
        expect(theme.palette[i as keyof typeof theme.palette]).toMatch(/^#[0-9a-fA-F]{6}$/);
      }
    }
  });

  it("default theme exists in themes list", () => {
    const defaultTheme = themes.find((t) => t.name === defaults.themeName);
    expect(defaultTheme).toBeDefined();
    expect(defaultTheme!.background).toBe(defaults.backgroundColor);
    expect(defaultTheme!.foreground).toBe(defaults.foregroundColor);
  });

  it("has unique theme names", () => {
    const names = themes.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
