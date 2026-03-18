import type { AnsiSnapSettings } from "../types";
import { themes } from "./themes";

const defaultTheme = themes[0]!;

export const defaults: AnsiSnapSettings = {
  themeName: defaultTheme.name,
  backgroundColor: defaultTheme.background,
  foregroundColor: defaultTheme.foreground,
  cursorColor: defaultTheme.cursorColor ?? defaultTheme.foreground,
  cursorText: defaultTheme.cursorText ?? defaultTheme.background,
  selectionBackground: defaultTheme.selectionBackground ?? "#3e4451",
  selectionForeground: defaultTheme.selectionForeground ?? defaultTheme.foreground,
  palette: { ...defaultTheme.palette },
  transparentBackground: false,

  chromeStyle: "macos",

  titleText: "",
  titleAlign: "center",
  titleFontFamily: "'Maple Mono NF CN', monospace",
  titleFontSize: 13,

  contentFontFamily: "'Maple Mono NF CN', monospace",
  contentFontSize: 14,
  contentLineHeight: 1.4,
  contentLetterSpacing: 0,
  contentPaddingX: 16,
  contentPaddingY: 12,

  exportPixelRatio: 2,

  customCss: "",
};
