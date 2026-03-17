import { watch } from "vue";
import { useSettings } from "./useSettings";

let styleElement: HTMLStyleElement | null = null;

export function useCustomCss() {
  const { settings } = useSettings();

  function ensureStyleElement() {
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.setAttribute("data-ansi-snap-custom", "");
      document.head.appendChild(styleElement);
    }
    return styleElement;
  }

  watch(
    () => settings.customCss,
    (css) => {
      const el = ensureStyleElement();
      el.textContent = css;
    },
    { immediate: true },
  );
}
