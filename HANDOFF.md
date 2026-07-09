# TaskFlow Handoff

## Current Project Status

TaskFlow is a working localStorage-powered personal to-do dashboard built with plain HTML, CSS, and JavaScript. It runs from `index.html` without a build step and has no backend.

Current files of interest:

- `index.html`
- `styles.css`
- `app.js`
- `design.md`
- `assets/icons/raw/`

## Working Features

- Dashboard shell with sidebar, top header, status cards, analytics, calendar, and Daily Tasks table.
- Task CRUD through a reusable add/edit modal.
- Task fields include `icon` as well as title, category, priority, due date, status, and timestamps.
- Status dropdown and completion checkbox update tasks.
- Dynamic status counts.
- Dynamic completion rate and status breakdown.
- Weekly completed chart using `completedAt`.
- Search by task title or category.
- Filter by status and priority.
- Sort by due date ascending/descending.
- Export tasks as JSON.
- Import JSON array or `{ "tasks": [...] }`.
- Clear local task data.
- Theme toggle persisted with `taskflow.theme`.
- EN/TH language toggle persisted with `taskflow.lang`.
- Compact monthly calendar view with selected day task cards.
- Add/Edit modal includes task icon picker and inline title validation.
- Local SVG icons load from `assets/icons/raw/` using `<img>`.

## Recent Work

- Added Thai/English language switching.
- Polished header toolbar, status cards, analytics, Daily Tasks table, calendar, and modal.
- Switched the app font to Itim.
- Added task icon support to the data model.
- Added icon picker in the Add/Edit modal.
- Changed task row icon badges from initials to selected local SVG icons.
- Added import normalization for missing or invalid icons.
- Changed raw local SVG rendering to `<img>` tags for compatibility.

## Current Problems / Risks

- `design.md` is partly outdated compared with the implemented app.
- Browser alert/confirm messages for import are not fully localized.
- Sidebar `Settings` is present visually but not implemented as a separate feature.
- Icons rendered with `<img>` do not inherit `currentColor`; their color comes from the SVG file itself.
- Google Font requires network access unless cached.
- No automated test suite exists.
- Manual browser testing is still needed after UI changes.

## Next Suggested Tasks

- Add localized import/export/clear success and error messaging.
- Add a lightweight toast system instead of `alert()` / `confirm()` where appropriate.
- Consider a real Settings section for language, theme, and data controls.
- Improve sidebar icons using the local SVG assets.
- Clean up or update `design.md` so it matches the current implementation.
- Add a short manual test checklist to README or a separate testing doc.
- Consider normalizing existing localStorage tasks on startup and persisting the normalized `icon` field.

## Important Warnings

- Do not add frameworks or external UI/chart/icon libraries.
- Do not introduce a build step unless the user explicitly asks.
- Keep the app runnable by opening `index.html`.
- Do not break existing localStorage data.
- Use `assets/icons/raw/` paths relative to `index.html`.
- Do not use absolute paths like `/assets/...`.
- If task data changes, keep import normalization backward-compatible.

## Continuation Prompt

Paste this into another AI assistant to continue:

```text
You are continuing the TaskFlow project. It is a plain HTML/CSS/JS localStorage-powered personal to-do dashboard with no backend, no framework, and no external libraries. Read README.md, AGENTS.md, HANDOFF.md, index.html, styles.css, app.js, and design.md before editing. Preserve existing CRUD, localStorage, import/export, language toggle, theme toggle, dashboard counts, charts, calendar, and icon picker behavior. Keep the app runnable by opening index.html. Use local SVG icons from assets/icons/raw/ with relative paths. Do not add React, Vue, Tailwind, Bootstrap, Chart.js, icon libraries, CDNs, or a build step. Make scoped changes only and run node --check app.js plus git diff --check after edits.
```
