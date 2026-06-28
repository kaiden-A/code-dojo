# codeDojo — AGENTS.md

**Project**: An immersive educational platform teaching web development through the Shuhari (守破離) philosophy of mastery. Built with Next.js 16 App Router, Tailwind CSS 4, and heavy scroll-driven animations (GSAP, Framer Motion, Three.js).

---

## Build / Test / Lint

```bash
# Install
npm install

# Dev server (http://localhost:3000)
npm run dev

# Production build + sitemap generation (runs next-sitemap via postbuild)
npm run build

# Start production server
npm start

# Lint
npm run lint

# No test runner is configured yet.
```

| Script | What it does |
|---|---|
| `dev` | `next dev` — hot-reload dev server |
| `build` | `next build` + `next-sitemap` (postbuild) |
| `lint` | `eslint` with `eslint-config-next/core-web-vitals` + TypeScript rules |
| `start` | `next start` — production server |

---

## Architecture

### Tech stack
- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4 (`@theme` custom tokens, dark-only)
- **Animation**: Three.js (3D scenes), GSAP + ScrollTrigger, Framer Motion, Lenis (smooth scroll)
- **Icons**: Lucide React + Material Symbols (Google Fonts)
- **SEO**: `next-sitemap`, per-page `Metadata` exports, JSON-LD structured data

### Route map

```
/                         → Homepage: DojoLoader → Hero → About → Features
/curriculum               → Curriculum landing: scroll-reveal card gallery
/curriculum/how-website-work  → Scroll-driven "Digital Forge" (Framer Motion)
/curriculum/how-to-know       → Five Stages of Growth (Lenis + GSAP + Three.js)
/curriculum/magic-world-of-code  → Arcane 3D sigil scene (Three.js)
/curriculum/land-of-frameworks    → Vue.js deep-dive (Lenis + GSAP + Three.js)
/curriculum/backend-and-rest      → Backend & REST API (GSAP + Three.js)
/curriculum/deployment            → Deploy Vue+Express (GSAP + Three.js)
```

### Component tree

```
app/layout.tsx (root)        ← global metadata, JSON-LD, fonts, Header, Footer
  app/page.tsx               ← DojoLoader wrapper → Hero + About + Features
  app/curriculum/layout.tsx  ← (none — uses root layout with per-page metadata)
  app/curriculum/page.tsx    ← DojoBackground + CurriculumCard[6] (scroll-reveal)

  Each curriculum lesson page follows the same pattern:
    page.tsx (server wrapper) or layout.tsx (metadata wrapper) + "use client" page
      ├── Background component (full-screen Three.js / canvas effect)
      ├── SectionNav (fixed sidebar with scroll-tracking)
      ├── BreadcrumbJsonLd (structured data)
      └── Scene/Content component (scroll-triggered animations)
```

### Data flow
1. All pages are **statically pre-rendered** (no SSR, no API routes yet).
2. `app/layout.tsx` serves as the root shell — it provides HTML, fonts, JSON-LD, Header, Footer.
3. Each curriculum page defines its own `metadata` export (or gets it from a `layout.tsx` wrapper) for per-page SEO.
4. Client components use `IntersectionObserver`, GSAP `ScrollTrigger`, or Framer Motion `useScroll` for scroll-driven reveals — no server data fetching.
5. The sitemap is generated at build time by `next-sitemap` via the `postbuild` script.

---

## Key Files & Directories

| Path | Purpose |
|---|---|
| `app/` | Next.js App Router — all pages and layouts |
| `app/layout.tsx` | Root layout: fonts, SEO metadata, JSON-LD, Header, Footer |
| `app/page.tsx` | Homepage — imports DojoLoader, Hero, About, Features |
| `app/globals.css` | Tailwind v4 `@theme` tokens (dark palette: `#131313`, `#eabf8d`), animations |
| `app/components/` | Shared components: `Header`, `Footer`, `Hero`, `About`, `Features`, `DojoLoader`, `BreadcrumbJsonLd` |
| `app/curriculum/` | Curriculum section — pages + shared + per-lesson components |
| `app/curriculum/components/` | Shared curriculum: `CurriculumCard`, `DojoBackground`, `ScrollReveal` |
| `app/curriculum/<lesson>/` | Each lesson has its own `page.tsx`, optional `layout.tsx`, and `components/` |
| `public/` | Static assets: `icon.png`, `sitemap.xml`, `robots.txt`, `bg-music.mp3`, SVGs |
| `next.config.ts` | Image remote patterns, security headers |
| `next-sitemap.config.js` | Sitemap generation config (priorities, exclusions) |
| `tsconfig.json` | Path alias `@/*` → `./*`, bundler module resolution, `jsx: "react-jsx"` |
| `postcss.config.mjs` | Loads `@tailwindcss/postcss` |
| `eslint.config.mjs` | Flat config with `eslint-config-next/core-web-vitals` + TypeScript |

---

## Coding Conventions

### File organization
- One component per file, PascalCase filename matching export name.
- Each lesson lives in its own directory under `app/curriculum/<lesson-slug>/`.
- Three.js scene components go in the lesson's `components/` subdirectory.

### Component patterns
- **Server components** (no `"use client"`) for page shells that only export metadata and compose client children.
- **Client components** start with `"use client"` — used for any component with hooks, event handlers, scroll animations, or Three.js.
- Three.js / heavy animation components use `dynamic(() => import(...), { ssr: false })` to avoid SSR issues.

### Styling
- Tailwind CSS v4 with `@theme {}` directives for custom color tokens. All tokens use the `--color-*` convention.
- Dark-only theme (no light mode). Colors use semantic names: `primary` (#eabf8d / gold), `surface` (#131313), `outline`, `tertiary`.
- Japanese-dojo aesthetic: tatami textures, shoji patterns, gold accents, serif headings.
- Responsive design built with `md:`, `lg:` breakpoints in Tailwind.

### Animation patterns
| Goal | Tool | Pattern |
|---|---|---|
| Scroll-triggered reveal | IntersectionObserver + `useState` | Custom hook in component |
| Scroll-linked timeline | GSAP + ScrollTrigger | `gsap.to(el, { scrollTrigger: {...} })` |
| Smooth scroll | Lenis | `new Lenis()` in `useEffect` |
| Scroll progress (percentage) | Framer Motion | `useScroll()` + `useTransform()` + `useSpring()` |
| 3D scenes | Three.js | Dynamic import with `ssr: false`, render into `useRef` div |
| Entry animation | CSS `@keyframes` | Tailwind `animate-fade-up`, `animate-glow-pulse` |

### SEO
- Every page that can export metadata does so directly.
- Client-component pages get a sibling `layout.tsx` that exports metadata and wraps `{children}`.
- `BreadcrumbJsonLd` component renders per-page breadcrumb JSON-LD.
- Root layout has full OG/Twitter/JSON-LD setup.

### Error handling
- Minimal — most errors appear as TypeScript build failures.
- Three.js dynamic imports use `.catch()` to render fallback messages.
- GSAP/Lenis initialization wrapped in try/catch on some pages.

---

## Git Workflow

- **Branch**: `master` (single branch, no release/develop separation observed).
- **Commit style**: Single-line imperative descriptions, lowercase: `codedojo syllabus deployment`, `Backend-and-API`, `Add vuejs content, animation, styling`.
- **Working tree**: No stashed changes; working tree is typically clean before builds.

---

## CI/CD

No CI configuration detected. Build is manual via `npm run build`. The project is likely deployed manually (Vercel or similar) — the README references Vercel deployment.

---

## Tips for AI Agents

1. **Client vs server boundary**: The metadata API only works in server components. If a page uses `"use client"`, you **must** create a sibling `layout.tsx` to export metadata — you cannot add `export const metadata` to a client component.

2. **Dynamic imports**: Any file importing Three.js must be dynamically imported with `{ ssr: false }`. Direct imports of Three.js scenes in server components will crash the build.

3. **`@/` path alias** is configured in `tsconfig.json` and resolves to the project root. Use `@/app/components/...` for shared components, `@/app/curriculum/...` for curriculum imports.

4. **Tailwind v4** uses `@theme` not `@layer base` or `tailwind.config`. Color tokens are declared in `app/globals.css` under `@theme { --color-*: ... }`. All utility classes use the v4 syntax.

5. **No API routes or database** exist yet. All content is hardcoded TSX. Adding a CMS or API layer would require new route handlers under `app/api/`.

6. **`public/og-image.png` is missing** — the layout references it but the file doesn't exist. Social share previews will be blank until it's added.

7. **Favicon gap**: `favicon.ico`, `apple-touch-icon.png`, and `site.webmanifest` are referenced by the layout but don't exist in `public/`. Only `icon.png` is present.

8. **Three.js scenes are large**: `BackendScene.tsx` is 734 lines, `DojoScene.js` is 101 lines. If modifying these, read the full file first — small edits can break scroll-triggered animation timelines.

9. **Postbuild hook**: `next-sitemap` runs after every `build`. The generated `public/sitemap.xml` and `public/robots.txt` are overwritten each time. Manual edits to those files will be lost.

10. **No test suite** is configured. Any test runner (Vitest, Playwright, etc.) would need to be added from scratch.
