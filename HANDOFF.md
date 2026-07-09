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
- Command palette trigger in the header for quick app actions.
- Compact monthly calendar view with selected day task cards.
- Add/Edit modal includes task icon picker and inline title validation.
- Local SVG icons load from `assets/icons/raw/`.
- Main UI icons are normalized through CSS mask-based icon helpers so colors can be controlled by CSS.

## Recent Work

- Added Thai/English language switching.
- Polished header toolbar, status cards, analytics, Daily Tasks table, calendar, and modal.
- Switched the app font to Itim.
- Increased and normalized font sizing after switching to Itim so English and Thai text are easier to read.
- Added task icon support to the data model.
- Added icon picker in the Add/Edit modal.
- Changed task row icon badges from initials to selected local SVG icons.
- Added import normalization for missing or invalid icons.
- Added local SVG icon mapping in `app.js` for dashboard, task, calendar, analytics, settings, action, status, avatar, and theme icons.
- Added new local icons from `assets/icons/raw/`: edit, trash, circle-user, steps-carreer, progress-complete, brightness, and moon-stars.
- Updated Edit/Delete action buttons to use compact icon buttons inside an aligned action group.
- Removed the decorative icon from the language toggle so it displays only `EN` or `TH`.
- Updated the theme toggle to switch between brightness and moon-stars icons.
- Added a command palette modal opened from the header trigger, with quick actions for task creation, navigation, theme/language toggles, import, and export.
- Added a real dark theme palette using theme variables instead of dim opacity overlays on parent containers.
- Improved dark mode contrast for cards, controls, calendar cells, selected-day details, and the Daily Tasks table.
- Switched many UI icons from raw `<img>` rendering to CSS mask spans through the existing icon helper, so icon color can follow the design system.

## Current Problems / Risks

- `design.md` is partly outdated compared with the implemented app.
- Browser alert/confirm messages for import are not fully localized.
- Sidebar `Settings` is present visually but not implemented as a separate feature.
- Some documentation may still mention `<img>` icons, but much of the current UI now uses CSS mask icons.
- Some downloaded raw SVG files may still have inconsistent source artwork; CSS mask rendering controls color, but shape/weight may still vary by file.
- Google Font requires network access unless cached.
- No automated test suite exists.
- Manual browser testing is still needed after UI changes.
- Browser-based visual verification was attempted, but no in-app browser session was available in the environment at that time.

## Next Suggested Tasks

- Add localized import/export/clear success and error messaging.
- Add a lightweight toast system instead of `alert()` / `confirm()` where appropriate.
- Consider a real Settings section for language, theme, and data controls.
- Update README.md and AGENTS.md icon notes so they describe the current CSS mask icon approach accurately.
- Do a manual visual QA pass in the browser for light mode, dark mode, English, and Thai.
- Verify every icon path in DevTools Network and replace any visually mismatched SVGs if needed.
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
- Prefer the existing icon helper/CSS mask approach for UI icons when the icon color should match the theme.
- Plain `<img>` rendering is still acceptable only when preserving the original SVG colors is intentional.
- If task data changes, keep import normalization backward-compatible.

## Continuation Prompt

Paste this into another AI assistant to continue:

```text
You are continuing the TaskFlow project. It is a plain HTML/CSS/JS localStorage-powered personal to-do dashboard with no backend, no framework, and no external libraries. Read README.md, AGENTS.md, HANDOFF.md, index.html, styles.css, app.js, and design.md before editing. Preserve existing CRUD, localStorage, import/export, language toggle, theme toggle, command palette, dashboard counts, charts, calendar, and icon picker behavior. Keep the app runnable by opening index.html. Use local SVG icons from assets/icons/raw/ with relative paths. Prefer the existing CSS mask icon helper for UI icons that need theme-controlled colors. Do not add React, Vue, Tailwind, Bootstrap, Chart.js, icon libraries, CDNs, or a build step. Make scoped changes only and run node --check app.js plus git diff --check after edits.
```
