import { ref } from "vue";
import { toPng, toBlob } from "html-to-image";

export interface ExportOptions {
  transparent: boolean;
  pixelRatio: number;
}

const exporting = ref(false);
const fontReady = ref(false);

void document.fonts.ready.then(() => {
  fontReady.value = true;
});

const CONTENT_SELECTOR = '[data-ansi-snap="content-text"]';

function captureAndApply(element: HTMLElement, transparent: boolean): Map<HTMLElement, string> {
  const saved = new Map<HTMLElement, string>();

  // Save and modify parent (overflow constraint)
  if (element.parentElement) {
    saved.set(element.parentElement, element.parentElement.style.cssText);
    element.parentElement.style.overflow = "visible";
  }

  // Save and modify element
  saved.set(element, element.style.cssText);
  element.style.maxWidth = "none";
  element.style.overflow = "visible";
  element.style.width = "max-content";
  element.style.position = "absolute";
  element.style.left = "0";
  element.style.top = "0";
  if (transparent) {
    element.style.backgroundColor = "transparent";
  }

  // Save and modify content areas
  for (const ca of element.querySelectorAll<HTMLElement>(CONTENT_SELECTOR)) {
    saved.set(ca, ca.style.cssText);
    ca.style.overflow = "visible";
  }

  return saved;
}

function restore(saved: Map<HTMLElement, string>) {
  for (const [el, css] of saved) {
    el.style.cssText = css;
  }
}

async function withExportLayout<T>(
  element: HTMLElement,
  transparent: boolean,
  fn: () => Promise<T>,
): Promise<T> {
  exporting.value = true;
  const saved = captureAndApply(element, transparent);
  try {
    return await fn();
  } finally {
    restore(saved);
    exporting.value = false;
  }
}

export function useExport() {
  async function exportPng(element: HTMLElement, { transparent, pixelRatio }: ExportOptions) {
    const dataUrl = await withExportLayout(element, transparent, () =>
      toPng(element, { pixelRatio }),
    );
    downloadFile(dataUrl, "ansi-snap.png");
  }

  async function copyToClipboard(element: HTMLElement, { transparent, pixelRatio }: ExportOptions) {
    await withExportLayout(element, transparent, async () => {
      const blob = await toBlob(element, { pixelRatio });
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      }
    });
  }

  return {
    exporting,
    fontReady,
    exportPng,
    copyToClipboard,
  };
}

function downloadFile(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
