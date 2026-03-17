import { ref, computed, shallowRef } from "vue";
import type { Theme } from "../constants/themes";
import { themes as builtinThemes } from "../constants/themes";

interface AllThemesData {
  source: string;
  commit: string;
  count: number;
  themes: Theme[];
}

const allThemes = shallowRef<Theme[]>([...builtinThemes]);
const loading = ref(false);
const loaded = ref(false);
const query = ref("");

async function loadAllThemes() {
  if (loaded.value || loading.value) return;
  loading.value = true;
  try {
    const mod = await import("../constants/all-themes.json");
    const data = mod.default as unknown as AllThemesData;
    // Merge: keep builtins first, then add all from JSON (dedup by name)
    const builtinNames = new Set(builtinThemes.map((t) => t.name));
    const extra = data.themes
      .filter((t) => !builtinNames.has(t.name))
      .map((t) => ({
        ...t,
        ref: `${data.source}/blob/${data.commit.slice(0, 7)}/ghostty/${encodeURIComponent(t.name)}`,
        cursorColor: t.cursorColor ?? null,
        cursorText: t.cursorText ?? null,
        selectionBackground: t.selectionBackground ?? null,
        selectionForeground: t.selectionForeground ?? null,
        palette: t.palette ?? ({} as Theme["palette"]),
      }));
    allThemes.value = [...builtinThemes, ...extra];
    loaded.value = true;
  } finally {
    loading.value = false;
  }
}

function fuzzyMatch(text: string, pattern: string): boolean {
  const lower = text.toLowerCase();
  const p = pattern.toLowerCase();
  let pi = 0;
  for (let i = 0; i < lower.length && pi < p.length; i++) {
    if (lower[i] === p[pi]) pi++;
  }
  return pi === p.length;
}

export function useThemeSearch() {
  const filtered = computed(() => {
    const q = query.value.trim();
    if (!q) return allThemes.value;
    return allThemes.value.filter((t) => fuzzyMatch(t.name, q));
  });

  return {
    allThemes,
    filtered,
    query,
    loading,
    loaded,
    loadAllThemes,
  };
}
