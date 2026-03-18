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

  it("detects wrapper background/foreground (Ghostty html mode)", () => {
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

  it("unwraps <pre><div> from xterm.js (VS Code terminal) and strips wrapper bg/fg", () => {
    // xterm.js serializeAsHTML wraps in <pre><div style="color:…;background-color:…">
    // The wrapper bg/fg may be unreliable defaults (#000/#fff), so they must be
    // stripped from the result HTML so unstyled text inherits from the ansi-snap theme.
    const html = `<pre><div style="color: #000000; background-color: #ffffff; font-family: monospace; font-size: 12px;">
      <div><span style="color: #999999;">gray</span><span>default</span></div>
      <div><span style="color: #ff0000;">red</span><span>default</span></div>
    </div></pre>`;
    const result = sanitizeHtml(html);

    // Wrapper bg/fg should be detected
    expect(result.detectedBackground).toBe("rgb(255, 255, 255)");
    expect(result.detectedForeground).toBe("rgb(0, 0, 0)");

    // Result should NOT contain the wrapper's color/background-color
    // (unstyled <span>default</span> should inherit from content-area, not #000000)
    expect(result.html).not.toContain("rgb(0, 0, 0)");
    expect(result.html).not.toContain("rgb(255, 255, 255)");

    // Explicit ANSI colors on spans should be preserved
    expect(result.html).toContain("rgb(153, 153, 153)"); // #999999
    expect(result.html).toContain("rgb(255, 0, 0)"); // #ff0000

    // Unstyled spans should have no color attribute
    expect(result.html).toContain("<span>default</span>");
  });

  it("unwraps VS Code editor wrapper and strips wrapper bg/fg", () => {
    // VS Code editor copies: <div style="color:…;background-color:…"><div><span>…</span></div></div>
    // Every span has an explicit color, wrapper bg/fg should be stripped.
    const html = `<div style="color: #ebdbb2; background-color: #282828; font-family: monospace;">
      <div><span style="color: #fe8019;">const</span><span style="color: #ebdbb2;"> x</span></div>
    </div>`;
    const result = sanitizeHtml(html);

    expect(result.detectedBackground).toBe("rgb(40, 40, 40)");
    expect(result.detectedForeground).toBe("rgb(235, 219, 178)");

    // Span colors preserved
    expect(result.html).toContain("rgb(254, 128, 25)"); // #fe8019
    expect(result.html).toContain("rgb(235, 219, 178)"); // #ebdbb2 on span

    // Wrapper bg/fg should not be in result as a wrapper-level style
    // (the inner <div> containing spans should not have color/bg)
    expect(result.html).not.toContain("background-color");
  });
});
