// Ghostty default colors:
//   bg/fg: https://github.com/ghostty-org/ghostty/blob/71d6f08e9bf51965fb8b5ef6f0ea58633692c9a0/src/config/Config.zig#L593-L597
//   palette: https://github.com/ghostty-org/ghostty/blob/71d6f08e9bf51965fb8b5ef6f0ea58633692c9a0/src/terminal/color.zig#L296-L312
//
// Other themes from iTerm2-Color-Schemes (Ghostty build dependency):
//   https://github.com/mbadolato/iTerm2-Color-Schemes/tree/6c0e481e0ae001b736dc54c9fbd5567d8f972c70/ghostty
//
// Ghostty config color fields reference:
//   https://github.com/ghostty-org/ghostty/blob/71d6f08e9bf51965fb8b5ef6f0ea58633692c9a0/src/config/Config.zig
//   Fields: background, foreground, cursor-color, cursor-text,
//           selection-foreground, selection-background, palette (0-255)
//   No dedicated link/URL color — links use ANSI palette index 4 (Blue).
//
// Palette index reference:
//   0  Black        1  Red (errors)       2  Green (success)   3  Yellow (warnings)
//   4  Blue (URLs)  5  Magenta            6  Cyan (info)       7  White
//   8  Bright Black 9  Bright Red        10  Bright Green     11  Bright Yellow
//  12  Bright Blue 13  Bright Magenta    14  Bright Cyan      15  Bright White

import type { Palette } from "../types";

export interface Theme {
  name: string;
  ref: string;
  background: string;
  foreground: string;
  cursorColor: string | null;
  cursorText: string | null;
  selectionBackground: string | null;
  selectionForeground: string | null;
  palette: Palette;
}

// ref: https://github.com/ghostty-org/ghostty/blob/71d6f08e9bf51965fb8b5ef6f0ea58633692c9a0/src/config/Config.zig#L593-L597
// ref: https://github.com/ghostty-org/ghostty/blob/71d6f08e9bf51965fb8b5ef6f0ea58633692c9a0/src/terminal/color.zig#L296-L312
const ghosttyDefault: Theme = {
  name: "Ghostty Default",
  ref: "https://github.com/ghostty-org/ghostty/blob/71d6f08/src/config/Config.zig#L593-L597",
  background: "#282c34",
  foreground: "#ffffff",
  cursorColor: null,
  cursorText: null,
  selectionBackground: null,
  selectionForeground: null,
  palette: {
    0: "#1d1f21",
    1: "#cc6666",
    2: "#b5bd68",
    3: "#f0c674",
    4: "#81a2be",
    5: "#b294bb",
    6: "#8abeb7",
    7: "#c5c8c6",
    8: "#666666",
    9: "#d54e53",
    10: "#b9ca4a",
    11: "#e7c547",
    12: "#7aa6da",
    13: "#c397d8",
    14: "#70c0b1",
    15: "#eaeaea",
  },
};

// ref: https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/Dracula
const dracula: Theme = {
  name: "Dracula",
  ref: "https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/Dracula",
  background: "#282a36",
  foreground: "#f8f8f2",
  cursorColor: "#f8f8f2",
  cursorText: "#282a36",
  selectionBackground: "#44475a",
  selectionForeground: "#ffffff",
  palette: {
    0: "#21222c",
    1: "#ff5555",
    2: "#50fa7b",
    3: "#f1fa8c",
    4: "#bd93f9",
    5: "#ff79c6",
    6: "#8be9fd",
    7: "#f8f8f2",
    8: "#6272a4",
    9: "#ff6e6e",
    10: "#69ff94",
    11: "#ffffa5",
    12: "#d6acff",
    13: "#ff92df",
    14: "#a4ffff",
    15: "#ffffff",
  },
};

// ref: https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/Monokai%20Classic
const monokaiClassic: Theme = {
  name: "Monokai Classic",
  ref: "https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/Monokai%20Classic",
  background: "#272822",
  foreground: "#fdfff1",
  cursorColor: "#c0c1b5",
  cursorText: "#8d8e82",
  selectionBackground: "#57584f",
  selectionForeground: "#fdfff1",
  palette: {
    0: "#272822",
    1: "#f92672",
    2: "#a6e22e",
    3: "#e6db74",
    4: "#fd971f",
    5: "#ae81ff",
    6: "#66d9ef",
    7: "#fdfff1",
    8: "#6e7066",
    9: "#f92672",
    10: "#a6e22e",
    11: "#e6db74",
    12: "#fd971f",
    13: "#ae81ff",
    14: "#66d9ef",
    15: "#fdfff1",
  },
};

// ref: https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/iTerm2%20Solarized%20Dark
const solarizedDark: Theme = {
  name: "Solarized Dark",
  ref: "https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/iTerm2%20Solarized%20Dark",
  background: "#002b36",
  foreground: "#839496",
  cursorColor: "#839496",
  cursorText: "#073642",
  selectionBackground: "#073642",
  selectionForeground: "#93a1a1",
  palette: {
    0: "#073642",
    1: "#dc322f",
    2: "#859900",
    3: "#b58900",
    4: "#268bd2",
    5: "#d33682",
    6: "#2aa198",
    7: "#eee8d5",
    8: "#335e69",
    9: "#cb4b16",
    10: "#586e75",
    11: "#657b83",
    12: "#839496",
    13: "#6c71c4",
    14: "#93a1a1",
    15: "#fdf6e3",
  },
};

// ref: https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/iTerm2%20Solarized%20Light
const solarizedLight: Theme = {
  name: "Solarized Light",
  ref: "https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/iTerm2%20Solarized%20Light",
  background: "#fdf6e3",
  foreground: "#657b83",
  cursorColor: "#657b83",
  cursorText: "#eee8d5",
  selectionBackground: "#eee8d5",
  selectionForeground: "#586e75",
  palette: {
    0: "#073642",
    1: "#dc322f",
    2: "#859900",
    3: "#b58900",
    4: "#268bd2",
    5: "#d33682",
    6: "#2aa198",
    7: "#bbb5a2",
    8: "#002b36",
    9: "#cb4b16",
    10: "#586e75",
    11: "#657b83",
    12: "#839496",
    13: "#6c71c4",
    14: "#93a1a1",
    15: "#fdf6e3",
  },
};

// ref: https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/GitHub%20Light%20Default
const githubLight: Theme = {
  name: "GitHub Light",
  ref: "https://github.com/mbadolato/iTerm2-Color-Schemes/blob/6c0e481/ghostty/GitHub%20Light%20Default",
  background: "#ffffff",
  foreground: "#1f2328",
  cursorColor: "#0969da",
  cursorText: "#3c9cff",
  selectionBackground: "#1f2328",
  selectionForeground: "#ffffff",
  palette: {
    0: "#24292f",
    1: "#cf222e",
    2: "#116329",
    3: "#4d2d00",
    4: "#0969da",
    5: "#8250df",
    6: "#1b7c83",
    7: "#6e7781",
    8: "#57606a",
    9: "#a40e26",
    10: "#1a7f37",
    11: "#633c01",
    12: "#218bff",
    13: "#a475f9",
    14: "#3192aa",
    15: "#8c959f",
  },
};

export const themes: Theme[] = [
  ghosttyDefault,
  dracula,
  monokaiClassic,
  solarizedDark,
  solarizedLight,
  githubLight,
];
