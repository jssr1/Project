# Assets

Local, self-hosted assets only. The site must keep working without a CDN or any remote request.

```
assets/
├── favicon.svg     Site icon (used by index.html)
├── images/         Static illustrations, diagrams, textures
└── media/          Short video clips and frame sequences for the video lab
```

## Conventions

- **Images:** prefer SVG for diagrams and icons; use WebP/AVIF for photographs. Keep raster images at the smallest size that still looks sharp (1x and 2x variants when needed).
- **Video:** keep clips short (2–5 s), small (under ~1 MB), and use MP4/H.264 or WebM. Provide a poster image and dimensions to avoid layout shift.
- **Naming:** lowercase kebab-case, descriptive, no spaces, no version numbers. Example: `cpu-fetch-cycle.svg`, `pixel-grid-16x16.webp`.
- **Accessibility:** decorative images get `alt=""`; informative images get meaningful alt text from the translation layer.
- **Attribution:** if an asset comes from a third party, record its source and licence in this folder next to the file.
