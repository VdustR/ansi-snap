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

// Block-level tags that act as wrappers and should be peeled off
const WRAPPER_TAGS = new Set(["DIV", "PRE", "SECTION", "ARTICLE", "MAIN"]);

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

  // Remove unsafe tags
  for (const tag of doc.querySelectorAll("script,meta,link,title,head")) {
    tag.remove();
  }

  // Sanitize inline styles on elements that have them
  for (const el of doc.querySelectorAll("[style]")) {
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

  // Unwrap nested single-child wrapper elements (div, pre, etc.)
  // and detect background/foreground from the outermost wrapper that has them.
  // This handles both:
  //   - Ghostty/editor: <body><div style="color:…;background-color:…">…</div>
  //   - VS Code terminal (xterm.js): <body><pre><div style="…">…</div></pre>
  let detectedBackground: string | null = null;
  let detectedForeground: string | null = null;
  let unwrapTarget: Element = doc.body;

  while (unwrapTarget.children.length === 1) {
    const child = unwrapTarget.children[0]!;
    if (!(child instanceof HTMLElement)) break;
    if (!WRAPPER_TAGS.has(child.tagName)) break;

    if (!detectedBackground && child.style.backgroundColor) {
      detectedBackground = child.style.backgroundColor;
    }
    if (!detectedForeground && child.style.color) {
      detectedForeground = child.style.color;
    }

    unwrapTarget = child;
  }

  const resultHtml = unwrapTarget.innerHTML;

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
