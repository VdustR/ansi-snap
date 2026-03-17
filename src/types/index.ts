export type ChromeStyle = "macos" | "windows" | "linux" | "minimal" | "none";

export type TitleAlign = "left" | "center" | "right";

export interface Palette {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: string;
  14: string;
  15: string;
}

export interface AnsiSnapSettings {
  // Theme
  themeName: string;
  backgroundColor: string;
  foregroundColor: string;
  cursorColor: string;
  cursorText: string;
  selectionBackground: string;
  selectionForeground: string;
  palette: Palette;
  transparentBackground: boolean;

  // Chrome
  chromeStyle: ChromeStyle;

  // Title
  titleText: string;
  titleAlign: TitleAlign;
  titleFontFamily: string;
  titleFontSize: number;

  // Content
  contentFontFamily: string;
  contentFontSize: number;
  contentLineHeight: number;
  contentLetterSpacing: number;
  contentPaddingX: number;
  contentPaddingY: number;

  // Custom CSS
  customCss: string;
}
