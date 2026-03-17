# ansi-snap

Paste rich terminal text (with ANSI colors preserved), customize the frame and appearance, and export as PNG/SVG with transparent background support.

**[Live Demo](https://vdustr.github.io/ansi-snap/)**

## Features

- Paste from Ghostty (or any terminal that copies `text/html`) — colors are preserved
- 485+ themes from [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) with fuzzy search
- Full ANSI palette (0–15) customization — including link/URL color (palette 4)
- Window chrome styles: macOS, Windows, Linux (GNOME), Minimal, None
- Custom title bar with alignment options
- Export as PNG (2x), SVG, or copy to clipboard
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
