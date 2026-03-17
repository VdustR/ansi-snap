import { describe, it, expect } from "vitest";
import { sanitizeHtml } from "../composables/useClipboard";

describe("HTML sanitization", () => {
  it("strips script tags", () => {
    const result = sanitizeHtml('<div><script>alert("xss")</script>hello</div>');
    expect(result.html).not.toContain("<script>");
    expect(result.plainText).toContain("hello");
  });

  it("preserves allowed inline styles", () => {
    const result = sanitizeHtml(
      '<div><span style="color: red; font-size: 20px; font-weight: bold;">text</span></div>',
    );
    expect(result.html).toContain("color");
    expect(result.html).toContain("font-weight");
    expect(result.html).not.toContain("font-size");
  });

  it("strips disallowed styles", () => {
    const result = sanitizeHtml(
      '<div><span style="font-family: Arial; line-height: 2; color: blue;">text</span></div>',
    );
    expect(result.html).not.toContain("font-family");
    expect(result.html).not.toContain("line-height");
    expect(result.html).toContain("color");
  });

  it("extracts palette CSS variables from style block", () => {
    const html = `<div>
      <style>:root { --vt-palette-0: #282c34; --vt-palette-1: #e06c75; }</style>
      <span>text</span>
    </div>`;
    const result = sanitizeHtml(html);
    expect(result.paletteVars["--vt-palette-0"]).toBe("#282c34");
    expect(result.paletteVars["--vt-palette-1"]).toBe("#e06c75");
  });

  it("detects wrapper background/foreground (html mode)", () => {
    const html =
      '<div style="color: rgb(171, 178, 191); background-color: rgb(40, 44, 52);">text</div>';
    const result = sanitizeHtml(html);
    expect(result.detectedBackground).toBe("rgb(40, 44, 52)");
    expect(result.detectedForeground).toBe("rgb(171, 178, 191)");
  });

  it("returns null for wrapper without colors (mixed mode)", () => {
    const html = '<div style="font-family: monospace; white-space: pre;">text</div>';
    const result = sanitizeHtml(html);
    expect(result.detectedBackground).toBeNull();
    expect(result.detectedForeground).toBeNull();
  });

  it("preserves filter style (for inverted text)", () => {
    const result = sanitizeHtml('<div><span style="filter: invert(100%);">inverted</span></div>');
    expect(result.html).toContain("filter");
  });
});
