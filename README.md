# TaskFlow

TaskFlow is a local-first task management dashboard built with plain HTML, CSS, and JavaScript. It provides a focused workspace for planning tasks, tracking progress, reviewing completion analytics, and managing due dates without requiring an account or backend service.

All task data is stored in the current browser through `localStorage`.

## Highlights

- Create, edit, delete, complete, and update task status.
- Search tasks and filter by status or priority.
- Sort tasks by due date.
- Review task status cards, weekly completion activity, and completion rate.
- Manage due dates in a compact monthly calendar.
- Import and export task data as JSON.
- Switch between English and Thai.
- Switch between light and dark themes.
- Select local SVG icons for individual tasks.
- Use on desktop, tablet, and mobile layouts.

## Run Locally

No installation or build step is required.

1. Open `index.html` directly in a modern browser.
2. Alternatively, open the project in VS Code and use Live Server.

The application must continue to work in both modes.

## Technology

- HTML
- CSS
- Vanilla JavaScript
- Browser `localStorage`
- Local SVG assets

TaskFlow intentionally does not use a framework, package manager, backend, chart library, or external icon library.

## Project Structure

```text
TaskFlow-project/
|- index.html
|- styles/
|  `- styles.css
|- scripts/
|  `- app.js
|- assets/
|  `- icons/raw/
|- docs/
|  |- design.md
|  `- HANDOFF.md
|- AGENTS.md
`- README.md
```

## Data Storage

| Key | Description |
| --- | --- |
| `taskflow.tasks` | JSON array containing all tasks. |
| `taskflow.theme` | Selected theme: `light` or `dark`. |
| `taskflow.lang` | Selected interface language: `en` or `th`. |

Each task contains:

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

Valid values:

- Priority: `high`, `medium`, `low`
- Status: `not-started`, `in-progress`, `completed`
- Icon: `task`, `code`, `book`, `clipboard`, `file`, `folder`, `calendar`, `user`, `check`, `star`

## Import and Export

Export downloads the current task list as JSON. Import accepts either a JSON array of tasks or an object containing a `tasks` array. Imported records are validated and normalized; duplicate or invalid task IDs are replaced with unique IDs.

## Documentation

- [Project handoff](docs/HANDOFF.md): system status, constraints, known limitations, and validation checklist.
- [Agent guide](AGENTS.md): implementation rules for developers and coding agents.
- [Design reference](docs/design.md): original product and visual direction.

## Development Notes

- Keep all assets on relative paths so the app works from a direct file open and GitHub Pages.
- Use the existing CSS mask icon helper for UI icons that need theme-controlled colors.
- Add new UI text to both English and Thai translation dictionaries in `scripts/app.js`.
- Preserve backward compatibility with existing task data in `localStorage`.

## Validation

Run these checks after JavaScript or structural changes:

```powershell
node --check scripts/app.js
git diff --check
```

Manual checks should cover task CRUD, filters, import/export, theme and language switching, calendar behavior, responsive layouts, and local icon rendering.

## Current Limitations

- A dedicated Settings view is not available yet.
- Import and clear-data confirmations use browser dialogs rather than custom notifications.
- The Itim font is loaded from Google Fonts and may require network access on a first visit.
- Automated tests are not configured.
