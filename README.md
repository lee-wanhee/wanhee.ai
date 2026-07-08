# wanhee.ai

Personal website + blog for Wanhee Lee, live at **https://wanhee.ai**.
Custom, minimal theme with a light/dark toggle (default: light). Static site built with **Eleventy (11ty)**.

---

## Quick start (local dev)

```bash
npm install          # once
npm run serve        # dev server w/ live reload → http://localhost:8080
# or:
npm run build        # one-off build into ./_site
```

> Note: this is a **Node/Eleventy** project. (It was briefly an al-folio/Jekyll site;
> that history is in git but the current stack has no Ruby dependency.)

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds with Eleventy and
publishes `_site/` to the `gh-pages` branch → GitHub Pages serves it at `wanhee.ai`.
Just: **edit → `git push` → live in ~1–2 min.** No manual steps.

## Structure

```
src/
  _data/
    site.json            # name, email, socials, advisor/neuroailab/oldsite URLs
    publications.json    # Research page papers, grouped by theme
    book.json            # book title/subtitle/author + part list
  _includes/
    base.njk             # page shell: header nav, <head>, KaTeX CSS, noindex flag
    post.njk             # blog post layout
    book-chapter.njk     # book chapter layout (sidebar TOC + prev/next)
  css/style.css          # the entire theme (light default + dark via html[data-theme="dark"])
  index.njk              # home (links line + Writing list)
  research.njk           # Research page (renders publications.json)
  posts/*.md             # blog posts
  book/
    index.njk            # book cover / table of contents  (/book/)
    chapters/*.md        # book chapters
CNAME                    # custom domain (wanhee.ai) — do not delete
.eleventy.js             # config: collections (posts, chapters), KaTeX, filters
```

## How to add a blog post

Create `src/posts/YYYY-MM-DD-slug.md`:

```markdown
---
layout: post
title: My Post Title
date: 2026-07-08
description: One-line summary shown on the home list.
---

Body in Markdown. Inline math $e^{i\pi}+1=0$, display math:

$$ \mathcal{L}(\theta) = \dots $$

```python
print("code blocks are syntax-highlighted")
```
```

It auto-appears (newest first) on the home "Writing" list after deploy.

## How to add a book chapter

Create `src/book/chapters/NN-slug.md`:

```markdown
---
layout: book-chapter
title: Chapter Title
part: Scaling Laws        # must match a part name in _data/book.json
partNum: II
order: 2                  # controls reading order + prev/next
permalink: /book/scaling-laws/
---

Chapter body in Markdown. Math: `$...$` inline, `$$...$$` display.
```

To add/rename a **part**, edit `src/_data/book.json`.

## Math & code

- Math is **KaTeX, rendered at build time** (`@vscode/markdown-it-katex`).
  Use `$...$` for inline and `$$...$$` for display. **Do NOT use `\( ... \)`** — the
  plugin doesn't parse it and it will show as raw text.
- Code blocks use Prism (build-time). Token colors are in `style.css`.

## The book — current status

**"Introduction to Foundation Models" — _From the Bitter Lesson to Multimodal Intelligence_.**
Griffiths-style intro textbook. Five-part arc:

1. **The Bitter Lesson** — why learning + compute beats hand-built structure
2. **Scaling Laws** — predictable improvement with compute/data/params
3. **Discrete Data** — autoregressive language models
4. **Continuous Data** — diffusion & perception
5. **Multimodal** — unifying modalities → world models

- Lives at `/book/`. Ch. 1 has real prose; chapters 2–6 are stubs.
- **Currently UNLISTED**: not in the top nav, and `noindex` on every book page
  (see `noindex: true` in `book/index.njk` and `_includes/book-chapter.njk`).
  Reachable only by direct link: `https://wanhee.ai/book/`.
- **To publish it later:** add `<a href="/book/">Book</a>` back to the nav in
  `src/_includes/base.njk`, and remove the `noindex: true` flags.

## Infra / DNS notes

- Repo: `github.com/lee-wanhee/wanhee.ai` (public). Pages source: `gh-pages` branch.
- Domain registered/DNS at **Squarespace**. Apex `A` → GitHub Pages
  `185.199.108–111.153`; `www` CNAME → `lee-wanhee.github.io`. HTTPS = Let's Encrypt
  (auto-renew), Enforce HTTPS on.
- If the cert ever gets stuck again: unset the custom domain via the Pages API with
  `{"cname": null}` (NOT `""`), then re-add `{"cname":"wanhee.ai"}` — that re-triggers
  provisioning. (An empty string 404s and does nothing.)

## TODO / next steps

- [ ] Write the first real blog post (home "Writing" currently shows "Coming soon.")
- [ ] Flesh out book chapters 2–6
- [ ] Research page: add authors + venue for "Unsupervised 3D Scene Representation
      Learning via Movable Object Inference" (currently OpenReview link only). Optionally
      add the 3 earlier materials-science papers under an "Earlier work" heading.
- [ ] (Optional) decide if/when to publish the book (un-hide from nav, drop noindex).
```
