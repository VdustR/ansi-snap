import { ref } from "vue";

export interface PasteResult {
  html: string;
  plainText: string;
  paletteVars: Record<string, string>;
  detectedBackground: string | null;
  detectedForeground: string | null;
}

const ALLOWED_STYLES = new Set([
  "color",
  "background-color",
  "font-weight",
  "font-style",
  "text-decoration",
  "filter",
  "display",
]);

export function sanitizeHtml(html: string): PasteResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Extract palette CSS variables from <style> blocks
  const paletteVars: Record<string, string> = {};
  for (const styleEl of doc.querySelectorAll("style")) {
    const text = styleEl.textContent ?? "";
    const varRegex = /--vt-palette-(\d+)\s*:\s*([^;]+)/g;
    for (const match of text.matchAll(varRegex)) {
      paletteVars[`--vt-palette-${match[1]}`] = match[2]!.trim();
    }
    styleEl.remove();
  }

  // Detect wrapper div colors (Ghostty html mode)
  let detectedBackground: string | null = null;
  let detectedForeground: string | null = null;
  const wrapper = doc.body.querySelector(":scope > div");
  if (wrapper instanceof HTMLElement) {
    const wrapperBg = wrapper.style.backgroundColor;
    const wrapperFg = wrapper.style.color;
    if (wrapperBg) detectedBackground = wrapperBg;
    if (wrapperFg) detectedForeground = wrapperFg;
  }

  // Remove unsafe tags
  for (const tag of doc.querySelectorAll("script,meta,link,title,head")) {
    tag.remove();
  }

  // Sanitize inline styles on all elements
  for (const el of doc.querySelectorAll("*")) {
    if (!(el instanceof HTMLElement)) continue;
    const style = el.style;
    const keepStyles: string[] = [];
    for (let i = 0; i < style.length; i++) {
      const prop = style[i]!;
      if (ALLOWED_STYLES.has(prop)) {
        keepStyles.push(`${prop}:${style.getPropertyValue(prop)}`);
      }
    }
    if (keepStyles.length > 0) {
      el.setAttribute("style", keepStyles.join(";"));
    } else {
      el.removeAttribute("style");
    }
  }

  // Unwrap the outer wrapper if present
  let resultHtml: string;
  const bodyChildren = doc.body.children;
  if (bodyChildren.length === 1 && bodyChildren[0] instanceof HTMLElement) {
    resultHtml = bodyChildren[0].innerHTML;
  } else {
    resultHtml = doc.body.innerHTML;
  }

  return {
    html: resultHtml,
    plainText: doc.body.textContent ?? "",
    paletteVars,
    detectedBackground,
    detectedForeground,
  };
}

const pastedContent = ref<PasteResult | null>(null);

export function useClipboard() {
  function handlePaste(event: ClipboardEvent) {
    const htmlData = event.clipboardData?.getData("text/html");
    const textData = event.clipboardData?.getData("text/plain") ?? "";

    if (htmlData) {
      event.preventDefault();
      pastedContent.value = sanitizeHtml(htmlData);
    } else if (textData) {
      event.preventDefault();
      pastedContent.value = {
        html: escapeHtml(textData),
        plainText: textData,
        paletteVars: {},
        detectedBackground: null,
        detectedForeground: null,
      };
    }
  }

  return {
    pastedContent,
    handlePaste,
  };
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
