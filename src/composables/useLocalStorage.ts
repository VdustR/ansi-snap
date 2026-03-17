const STORAGE_KEY = "ansi-snap-settings";

export function useLocalStorage() {
  function load<T>(): Partial<T> | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as Partial<T>;
    } catch {
      return null;
    }
  }

  function save<T>(data: T) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage full or unavailable — silently ignore
    }
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY);
  }

  return { load, save, clear };
}
