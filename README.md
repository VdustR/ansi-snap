# ansi-snap

![ansi-snap](https://raw.githubusercontent.com/VdustR/ansi-snap/main/public/og-image.png)

Turn terminal and editor output into beautiful images — preserving original colors, not re-highlighting.

**[Live Demo](https://vdustr.github.io/ansi-snap/)**

## Why ansi-snap?

Tools like [Carbon](https://carbon.now.sh/), [Ray.so](https://ray.so/), [Snappify](https://snappify.com/), [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap), and [Polacode](https://marketplace.visualstudio.com/items?itemName=pnp.polacode) generate code images by re-applying syntax highlighting with their own built-in themes and language grammars. This means they are limited to supported languages and may render colors differently from what you actually see.

**ansi-snap takes a different approach** — it preserves the _original rendering_ from your terminal or editor, exactly as-is. You paste rich text (`text/html`) and ansi-snap keeps every color, style, and ANSI escape code intact. No re-parsing, no language detection, no theme mismatch.

This makes ansi-snap especially useful for content that traditional code snapshot tools can't handle:

- **Terminal output** — build logs, test results, CLI tools with colored output, interactive REPL sessions
- **Any language** — no grammar support needed; if your editor can highlight it, ansi-snap can capture it
- **Partial code snippets** — paste any fragment without worrying about syntax correctness; since there's no re-parsing, incomplete code renders just fine
- **Custom themes** — your terminal's exact color scheme is preserved, not approximated by a preset theme

## Features

- Paste from terminals and editors that copy `text/html` — colors are preserved
  - **[Ghostty](https://ghostty.org/)** — copy with ⌘C; ANSI colors use CSS variables for full theme support
  - **[VS Code](https://code.visualstudio.com/) Terminal** — use _Terminal: Copy Selection as HTML_ command (not ⌘C which copies plain text)
  - **[VS Code](https://code.visualstudio.com/) Editor** — copy with ⌘C; syntax highlighting colors are preserved
- 485+ themes from [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) with fuzzy search
- Full ANSI palette (0–15) customization — including link/URL color (palette 4)
- Window chrome styles: macOS, Windows, Linux (GNOME), Minimal, None
- Custom title bar with alignment options
- Export as PNG (2x) or copy to clipboard
- Transparent background export
- Custom CSS injection
- Settings persisted via URL hash and localStorage

## Tech Stack

- [Vue 3](https://vuejs.org/) + TypeScript
- [Vite+](https://viteplus.dev/) (Vite Plus)
- [html-to-image](https://github.com/bubkoo/html-to-image) for export
- Deployed on [GitHub Pages](https://vdustr.github.io/ansi-snap/)

## Development

```bash
pnpm install
pnpm dev
```

## License

[MIT](LICENSE) © 2026 [VdustR](https://github.com/VdustR)
