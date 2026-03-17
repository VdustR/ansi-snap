import { describe, it, expect, beforeEach } from "vitest";
import { useUrlHash } from "../composables/useUrlHash";
import { defaults } from "../constants/defaults";
import type { AnsiSnapSettings } from "../types";

describe("useUrlHash", () => {
  const { encodeSettings, decodeSettings } = useUrlHash();

  beforeEach(() => {
    window.location.hash = "";
  });

  it("returns empty string when settings match defaults", () => {
    const result = encodeSettings({ ...defaults });
    expect(result).toBe("");
  });

  it("encodes only changed settings", () => {
    const modified: AnsiSnapSettings = {
      ...defaults,
      backgroundColor: "#ff0000",
    };
    const encoded = encodeSettings(modified);
    expect(encoded).not.toBe("");

    const decoded = JSON.parse(atob(encoded)) as Partial<AnsiSnapSettings>;
    expect(decoded.backgroundColor).toBe("#ff0000");
    expect(decoded.contentFontSize).toBeUndefined();
  });

  it("decodes settings from URL hash", () => {
    const diff = { backgroundColor: "#ff0000", contentFontSize: 18 };
    window.location.hash = btoa(JSON.stringify(diff));

    const decoded = decodeSettings();
    expect(decoded).not.toBeNull();
    expect(decoded!.backgroundColor).toBe("#ff0000");
    expect(decoded!.contentFontSize).toBe(18);
  });

  it("returns null for empty hash", () => {
    window.location.hash = "";
    expect(decodeSettings()).toBeNull();
  });

  it("returns null for invalid hash", () => {
    window.location.hash = "not-valid-base64!!!";
    expect(decodeSettings()).toBeNull();
  });
});
