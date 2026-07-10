# TaskFlow Project Handoff

## Purpose

This document provides the operational context required to maintain and extend TaskFlow. It is intended for developers and coding agents taking ownership of future work.

## Project Overview

TaskFlow is a local-first personal task dashboard built with plain HTML, CSS, and JavaScript. It has no backend, authentication, build step, framework, or third-party UI/chart dependency. The application must remain usable when `index.html` is opened directly in a browser or served through VS Code Live Server.

## Repository Structure

| Path | Responsibility |
| --- | --- |
| `index.html` | Application shell, semantic markup, dialogs, and static UI text. |
| `styles/styles.css` | Design tokens, layout, responsive rules, theme variables, and component styling. |
| `scripts/app.js` | State management, rendering, task CRUD, localStorage, import/export, i18n, charts, calendar, and dialogs. |
| `docs/design.md` | Original visual and product reference. Validate against the implementation before applying it literally. |
| `assets/icons/raw/` | Local SVG assets used by the icon helper and CSS masks. |
| `AGENTS.md` | Mandatory implementation constraints and working conventions. |

## Current Functional Scope

- Dashboard with status cards, weekly completion chart, completion-rate chart, compact calendar, and Daily Tasks view.
- Task creation, editing, deletion, status changes, and completion checkbox behavior.
- Search, status filter, priority filter, and due-date sorting.
- JSON export, validated JSON import, and local data clearing.
- English and Thai interface switching.
- Light and dark theme switching.
- Command palette for supported navigation and common actions.
- Compact monthly calendar with selected-day task details.
- Task icon picker with category-based fallback icons.
- Responsive desktop, tablet, and mobile layouts, including a drawer navigation pattern below desktop width.

## Data Contract

Task data is stored in `localStorage` under `taskflow.tasks` as an array of objects:

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

Rules:

- `dueDate` is `YYYY-MM-DD` or an empty string.
- `createdAt`, `updatedAt`, and `completedAt` are ISO timestamps.
- `completedAt` is `null` unless `status` is `completed`.
- Valid statuses: `not-started`, `in-progress`, `completed`.
- Valid priorities: `high`, `medium`, `low`.
- Valid icons: `task`, `code`, `book`, `clipboard`, `file`, `folder`, `calendar`, `user`, `check`, `star`.
- Imported and loaded tasks are normalized. Duplicate or invalid IDs are replaced with unique numeric IDs.
- Invalid `taskflow.tasks` JSON is left untouched to avoid overwriting recoverable user data; the app renders an empty task list until the user imports valid data or clears local data.

Additional localStorage keys:

| Key | Values | Purpose |
| --- | --- | --- |
| `taskflow.theme` | `light`, `dark` | Persists the selected theme. |
| `taskflow.lang` | `en`, `th` | Persists the selected language. |

## Implementation Conventions

- Keep the project dependency-free: do not introduce frameworks, CSS libraries, icon libraries, build tooling, or CDNs.
- Use relative asset paths only. Do not use root-relative `/assets/...` paths or local machine paths.
- Use the existing CSS mask icon helper for theme-controlled UI icons. Do not use `<svg><use></use></svg>` with the downloaded raw SVG files.
- Add every new user-facing string to both language dictionaries in `scripts/app.js`.
- Preserve task data backward compatibility when changing the model or import behavior.
- Keep DOM changes scoped to the existing structure and avoid unrelated refactors.
- Do not expose a navigation item or command action until its destination is implemented.

## Known Limitations

- `docs/design.md` contains earlier design direction and may not reflect the latest implementation.
- A dedicated Settings view has not been implemented.
- Import and clear-data confirmations use native browser dialogs. They are localized, but there is no toast or custom notification system.
- Source SVG artwork can vary in shape and weight even when CSS mask coloring is consistent.
- The Itim font is loaded from Google Fonts and requires network access unless already cached.
- Automated tests are not configured; browser validation remains manual.

## Recommended Next Work

1. Perform a structured visual QA pass in light/dark themes, English/Thai, and desktop/tablet/mobile breakpoints.
2. Replace native confirmation and alert dialogs with an accessible local notification/confirmation component.
3. Update `docs/design.md` to match the implemented navigation, calendar, icon, and responsive behavior.
4. Add a dedicated Settings view only if it has a defined functional scope.
5. Add lightweight automated checks for task normalization, filtering, and import validation if a test strategy is approved.

## Validation Before Handoff or Merge

Run the following after JavaScript or structural changes:

```powershell
node --check scripts/app.js
git diff --check
```

Manually verify:

- Add, edit, delete, completion, and status-change flows.
- Search, filters, sorting, import/export, and clear data.
- Language and theme switching without a page reload.
- Calendar navigation, selected-day task editing, and no-due-date summary behavior.
- Icon rendering without failed network requests.
- Layout at desktop, tablet, and mobile widths without horizontal overflow.

## Continuation Brief

```text
Continue TaskFlow as a dependency-free HTML/CSS/JavaScript application. Read AGENTS.md, README.md, docs/HANDOFF.md, index.html, styles/styles.css, scripts/app.js, and docs/design.md before editing. Preserve localStorage compatibility, task CRUD, import/export, i18n, themes, command palette, charts, calendar, icon picker, and responsive behavior. Use local SVG assets with relative paths and the existing CSS mask icon helper for theme-controlled icons. Make focused changes, add EN/TH strings for new UI text, then run node --check scripts/app.js and git diff --check.
```
