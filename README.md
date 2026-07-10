# TaskFlow

TaskFlow is a local-first personal to-do dashboard built with plain HTML, CSS, and JavaScript. It is designed as a polished productivity dashboard with status cards, analytics, a compact calendar overview, and a daily task manager.

The app has no backend, no login, no framework, and stores user data in the browser with `localStorage`.

## Tech Stack

- HTML: `index.html`
- CSS: `styles/styles.css`
- JavaScript: `scripts/app.js`
- Browser storage: `localStorage`
- Local SVG assets: `assets/icons/raw/`
- Google Font: Itim from Google Fonts

No React, Vue, Tailwind, Bootstrap, Chart.js, icon libraries, build tools, or package manager are required.

## How To Run

Open `index.html` directly in a browser.

You can also use VS Code Live Server for easier refresh and browser testing. The app should remain runnable either way.

## Main Files

- `index.html`: Dashboard structure, sidebar, header, status cards, analytics, calendar, task table, and add/edit modal.
- `styles/styles.css`: Visual design, layout, responsive behavior, dark mode, table styling, modal styling, icon picker styling.
- `scripts/app.js`: Task state, localStorage persistence, CRUD, filters, sorting, charts, calendar rendering, import/export, theme toggle, language toggle, icon selection.
- `docs/design.md`: Original product/design direction. Some implementation details are now newer than this file.
- `docs/HANDOFF.md`: Current project state, known risks, and continuation notes for future contributors.
- `assets/icons/raw/`: Downloaded SVG files used by task icons and icon picker.

## Current Features

- Dashboard layout with sidebar, header, status cards, analytics, calendar, and daily task table.
- Add, edit, delete tasks.
- Change task status from the table.
- Completion checkbox behavior.
- Task fields: `id`, `title`, `category`, `icon`, `priority`, `dueDate`, `status`, `createdAt`, `updatedAt`, `completedAt`.
- Dynamic Not Started, In Progress, and Completed counts.
- Dynamic completion rate and status breakdown.
- Weekly completed task chart based on `completedAt`.
- Daily task search by title or category.
- Filter by status and priority.
- Sort by due date ascending or descending.
- Compact monthly calendar view with selected day task details.
- Export tasks as JSON.
- Import tasks from JSON array or `{ "tasks": [...] }`.
- Clear all local task data.
- Light/dark theme toggle saved in localStorage.
- Thai/English language toggle saved in localStorage.
- Add/Edit modal with inline title validation.
- Custom task icon picker stored per task.

## localStorage Keys

- `taskflow.tasks`: JSON array of task objects.
- `taskflow.theme`: `"light"` or `"dark"`.
- `taskflow.lang`: `"en"` or `"th"`.

## Task Values

Valid priorities:

```js
["high", "medium", "low"]
```

Valid statuses:

```js
["not-started", "in-progress", "completed"]
```

Valid task icons:

```js
["task", "code", "book", "clipboard", "file", "folder", "calendar", "user", "check", "star"]
```

## Icon Assets

The app expects SVG icons at:

```text
assets/icons/raw/
```

UI icons are rendered through CSS mask spans, which lets their color follow the current theme. Task rows and the modal icon picker use the existing icon helper with local SVG paths, for example:

```text
assets/icons/raw/calendar-svgrepo-com.svg
```

## Known Issues / Polish Needed

- `docs/design.md` still contains some older guidance that does not fully match the current implementation.
- The Settings view is not implemented yet, so it is intentionally not shown in the sidebar or command palette.
- Import confirmation and error messages use the current app language, but still use browser dialogs.
- Most local SVG files are used as CSS masks, so UI icon colors are controlled by the TaskFlow theme variables.
- Google Font loading requires internet access unless cached.
- No automated tests are configured yet; testing is manual in the browser.
