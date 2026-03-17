import type { AnsiSnapSettings, Palette } from "../types";
import { defaults } from "../constants/defaults";

function paletteDiff(current: Palette, base: Palette): Partial<Palette> | null {
  const diff: Partial<Palette> = {};
  let changed = false;
  for (let i = 0; i < 16; i++) {
    const key = i as keyof Palette;
    if (current[key] !== base[key]) {
      diff[key] = current[key];
      changed = true;
    }
  }
  return changed ? diff : null;
}

export function useUrlHash() {
  function encodeSettings(settings: AnsiSnapSettings): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const diff: Record<string, any> = {};
    for (const key of Object.keys(defaults) as (keyof AnsiSnapSettings)[]) {
      if (key === "palette") continue; // handled separately
      if (settings[key] !== defaults[key]) {
        diff[key] = settings[key];
      }
    }
    const pd = paletteDiff(settings.palette, defaults.palette);
    if (pd) diff.palette = pd;
    if (Object.keys(diff).length === 0) return "";
    return btoa(JSON.stringify(diff));
  }

  function decodeSettings(): Partial<AnsiSnapSettings> | null {
    const hash = window.location.hash.slice(1);
    if (!hash) return null;
    try {
      return JSON.parse(atob(hash)) as Partial<AnsiSnapSettings>;
    } catch {
      return null;
    }
  }

  function updateHash(settings: AnsiSnapSettings) {
    const encoded = encodeSettings(settings);
    if (encoded) {
      window.history.replaceState(null, "", `#${encoded}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  return { encodeSettings, decodeSettings, updateHash };
}
