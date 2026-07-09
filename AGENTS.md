# TaskFlow Agent Guide

This file is for AI coding agents and developers continuing TaskFlow.

## Core Rules

- Keep the project plain HTML, CSS, and JavaScript.
- Do not add React, Vue, Svelte, Angular, Tailwind, Bootstrap, Chart.js, icon libraries, bundlers, package managers, or CDN dependencies.
- Keep the app runnable by opening `index.html` directly or by using VS Code Live Server.
- Preserve existing functionality unless the user explicitly asks to change it.
- Do not add backend services, login, cloud sync, collaboration, payments, or real notifications.
- Keep data local-first and stored in `localStorage`.

## Main File Responsibilities

- `index.html`: DOM structure and semantic sections.
- `styles.css`: Layout, design system, responsive behavior, theme styles, modal/table/calendar/icon styling.
- `app.js`: Application state, rendering, task CRUD, localStorage, import/export, charts, calendar, i18n, theme, icon picker.
- `design.md`: Reference design/product direction; verify against current code before following it literally.
- `assets/icons/raw/`: Local SVG image assets.

## Task Data Model

Current tasks use this shape:

```js
{
  id,
  title,
  category,
  icon,
  priority,
  dueDate,
  status,
  createdAt,
  updatedAt,
  completedAt
}
```

Notes:

- `dueDate` is stored as `YYYY-MM-DD` or `""`.
- `createdAt`, `updatedAt`, and `completedAt` are ISO date strings.
- `completedAt` is `null` unless `status === "completed"`.
- Existing tasks may not have `icon`; normalize or infer it from category.

## localStorage Keys

- `taskflow.tasks`
- `taskflow.theme`
- `taskflow.lang`

## Valid Values

Valid task statuses:

```js
["not-started", "in-progress", "completed"]
```

Valid priorities:

```js
["high", "medium", "low"]
```

Valid icons:

```js
["task", "code", "book", "clipboard", "file", "folder", "calendar", "user", "check", "star"]
```

## Language / i18n Rules

- Use the `translations` object in `app.js`.
- English is `en`; Thai is `th`.
- Persist language with `taskflow.lang`.
- Add new UI strings to both languages.
- For static HTML text, prefer `data-i18n` or `data-i18n-placeholder`.
- For dynamic text, use `t(key)` or existing label helpers.
- After changing language behavior, test the language toggle without refreshing the page.

## Icon Rules

- Task icons use local SVG image assets from:

```text
assets/icons/raw/
```

- Use relative paths from `index.html`; do not use leading `/`.
- Current task rows and icon picker render icons as `<img>`.
- Do not use `<svg><use href="..."></use></svg>` with downloaded raw SVG files.
- If an icon is missing or invalid, fall back to `task`.
- Keep task icon badges around 40px to 44px square.
- Do not show category initials as task icons.

Current category fallback mapping:

- Coding, Web App, Development -> `code`
- Learning, Study -> `book`
- Planning -> `clipboard`
- Documentation -> `file`
- Personal -> `user`
- Admin -> `folder`
- Meeting -> `calendar`
- Productivity -> `check`
- Default / unknown -> `task`

## Design Direction

- Modern SaaS productivity dashboard.
- White cards, soft gray background, rounded corners, soft borders, subtle shadows.
- Primary blue-violet, secondary blue, success green, warning orange, danger red.
- Keep layouts compact, polished, and usable.
- Avoid marketing landing-page layouts; this is an actual app interface.
- Preserve responsive behavior for desktop, tablet, and mobile.

## Preferred Workflow For Future AI Edits

1. Inspect `index.html`, `styles.css`, `app.js`, and relevant assets before editing.
2. Make small, scoped changes.
3. Avoid unrelated refactors.
4. Preserve localStorage data shape or add backward-compatible normalization.
5. Keep import/export compatible with older task JSON when possible.
6. Run `node --check app.js` after JavaScript edits.
7. Run `git diff --check` after edits.
8. Manually test in the browser when UI behavior changes.
