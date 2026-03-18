import { reactive, watch } from "vue";
import type { AnsiSnapSettings, Palette } from "../types";
import type { Theme } from "../constants/themes";
import { defaults } from "../constants/defaults";
import { themes } from "../constants/themes";
import { useUrlHash } from "./useUrlHash";
import { useLocalStorage } from "./useLocalStorage";

const { decodeSettings, updateHash } = useUrlHash();
const { load, save } = useLocalStorage();

// Load priority: URL hash > localStorage > defaults
function loadInitialSettings(): AnsiSnapSettings {
  const base = { ...defaults, palette: { ...defaults.palette } };
  const stored = load<AnsiSnapSettings>();
  if (stored) {
    const { palette: storedPalette, ...rest } = stored;
    Object.assign(base, rest);
    if (storedPalette) Object.assign(base.palette, storedPalette);
  }
  const fromHash = decodeSettings();
  if (fromHash) {
    const { palette: hashPalette, ...rest } = fromHash;
    Object.assign(base, rest);
    if (hashPalette) Object.assign(base.palette, hashPalette);
  }
  return base;
}

const state = reactive<AnsiSnapSettings>(loadInitialSettings());

// Single watcher at module scope — runs once, batched via flush: 'post'
let skipPersist = false;

watch(
  state,
  (s) => {
    if (skipPersist) return;
    save(s);
    updateHash(s as AnsiSnapSettings);
  },
  { deep: true, flush: "post" },
);

function applyThemeColors(theme: Theme) {
  state.backgroundColor = theme.background;
  state.foregroundColor = theme.foreground;
  state.titleColor = theme.foreground;
  state.cursorColor = theme.cursorColor ?? theme.foreground;
  state.cursorText = theme.cursorText ?? theme.background;
  state.selectionBackground = theme.selectionBackground ?? "";
  state.selectionForeground = theme.selectionForeground ?? "";
  if (theme.palette) {
    for (let i = 0; i < 16; i++) {
      const key = i as keyof Palette;
      const val = theme.palette[key];
      if (val) state.palette[key] = val;
    }
  }
}

export function useSettings() {
  function applyTheme(themeName: string, theme?: Theme) {
    if (theme) {
      state.themeName = theme.name;
      applyThemeColors(theme);
      return;
    }
    const builtin = themes.find((t) => t.name === themeName);
    if (builtin) {
      state.themeName = builtin.name;
      applyThemeColors(builtin);
    } else {
      state.themeName = "Custom";
    }
  }

  function updateSetting<K extends keyof AnsiSnapSettings>(key: K, value: AnsiSnapSettings[K]) {
    state[key] = value;
    if (key === "backgroundColor" || key === "foregroundColor") {
      state.themeName = "Custom";
    }
  }

  function resetToDefaults() {
    skipPersist = true;
    Object.assign(state, { ...defaults, palette: { ...defaults.palette } });
    skipPersist = false;
    save(state);
    updateHash(state as AnsiSnapSettings);
  }

  return {
    settings: state,
    applyTheme,
    updateSetting,
    resetToDefaults,
  };
}
