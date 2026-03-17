import type { ChromeStyle } from "../types";

export interface ChromeStyleOption {
  value: ChromeStyle;
  label: string;
}

export const chromeStyleOptions: ChromeStyleOption[] = [
  { value: "macos", label: "macOS" },
  { value: "windows", label: "Windows" },
  { value: "linux", label: "Linux (GNOME)" },
  { value: "minimal", label: "Minimal" },
  { value: "none", label: "None" },
];
