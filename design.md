# TaskFlow Design Specification

## 1. Project Overview

**TaskFlow** is a personal productivity and to-do dashboard web app designed for individual users.

The app can be shared with friends, but in version 1 each user's data is stored locally on their own device using `localStorage`.

The goal of this project is to create a polished, usable, portfolio-quality to-do dashboard that works without a backend.

### Version 1 does not include

- User login
- Cloud sync
- Team collaboration
- Assigned users
- Invite members
- Backend database
- Real push notifications
- Payment or subscription features

---

## 2. Tech Scope

Version 1 should be built with:

- HTML
- CSS
- JavaScript
- localStorage

No frontend framework is required for the first version.

Recommended file structure:

```text
taskflow/
├─ index.html
├─ styles.css
├─ app.js
├─ design.md
└─ README.md
```

---

## 3. Product Goal

TaskFlow should help users:

- See their task progress at a glance
- Add, edit, delete, and manage daily tasks
- Track task status
- Filter and search tasks quickly
- Save all tasks locally on their device
- Export and import task data when needed

The app should feel simple, friendly, modern, and useful for real daily productivity.

---

## 4. Core Features

### Dashboard

The dashboard should include:

- Bento status cards
  - Not Started
  - In Progress
  - Completed
- Weekly Task Overview chart
- Completion Rate chart
- Daily Tasks table

### Daily Tasks

Users can:

- Add task
- Edit task
- Delete task
- Change task status
- Search tasks
- Filter tasks by status
- Filter tasks by priority
- Sort tasks by due date, priority, or created date

### Local Data Utilities

Users can:

- Export tasks as JSON
- Import tasks from JSON
- Clear all local task data

### Theme

Users can:

- Toggle between light mode and dark mode
- Save selected theme in `localStorage`

---

## 5. Layout Structure

The app should use a desktop dashboard layout.

Main sections:

1. Left Sidebar
2. Top Header
3. Bento Status Cards
4. Analytics Dashboard Section
5. Daily Tasks Section

Basic layout structure:

```text
┌──────────────────────────────────────────────────────────────┐
│ Sidebar        │ Header: Dashboard / Search / + New Task     │
│                ├──────────────────────────────────────────────┤
│                │ Bento Cards                                 │
│                │ [Not Started] [In Progress] [Completed]     │
│                ├──────────────────────────────────────────────┤
│                │ Analytics                                   │
│                │ [Weekly Overview] [Completion Rate]         │
│                ├──────────────────────────────────────────────┤
│                │ Daily Tasks                                 │
│                │ Search / Filters / Table                    │
└──────────────────────────────────────────────────────────────┘
```

---

## 6. Sidebar

The sidebar should be clean and simple.

### Logo

Use the app name:

```text
TaskFlow
```

Add a simple checkmark icon or task icon beside the logo.

### Navigation Items

Sidebar menu:

- Dashboard
- Tasks
- Today
- Analytics
- Settings

The active item should be **Dashboard**.

### Local Data Card

At the bottom of the sidebar, include a small information card.

Content:

```text
Local Data
Tasks are saved on this device.
```

Suggested icon:

- Storage icon
- Database icon
- Shield icon

This reminds users that the app stores data locally.

### User Profile

Below the Local Data card, include a simple generic user profile.

```text
Demo User
demo@taskflow.app
```

### Do Not Include

Do not include:

- Team members
- Invite member button
- Assigned user avatars
- Collaboration UI
- Workspace switcher
- Enterprise admin features

---

## 7. Header

The top header should include:

### Page Title

```text
Dashboard
```

### Subtitle

```text
Welcome back 👋
Here’s your productivity overview.
```

### Header Controls

Include:

- Search bar
- Theme toggle icon
- Notification bell icon
- Primary `+ New Task` button

### Search Placeholder

```text
Search tasks, projects, or tags...
```

### Primary Button

```text
+ New Task
```

Clicking this button should open the add task form or modal.

---

## 8. Bento Status Cards

There should be 3 large status cards in one row on desktop.

### Card 1: Not Started

Content:

```text
Not Started
18
Tasks waiting to begin
```

Behavior:

- Count tasks where `status === "not-started"`

Visual style:

- Soft purple accent
- Clock icon or circle icon
- Small sparkline or mini progress visual

---

### Card 2: In Progress

Content:

```text
In Progress
12
Tasks currently active
```

Behavior:

- Count tasks where `status === "in-progress"`

Visual style:

- Blue accent
- Progress icon or refresh icon
- This card should be slightly emphasized with a stronger shadow, border, or accent background
- Small sparkline or mini progress visual

---

### Card 3: Completed

Content:

```text
Completed
36
Tasks completed
```

Behavior:

- Count tasks where `status === "completed"`

Visual style:

- Green accent
- Checkmark icon
- Small sparkline or mini progress visual

---

## 9. Analytics Section

The analytics section should sit below the bento cards.

It should contain 2 cards:

1. Weekly Task Overview
2. Completion Rate

---

### 9.1 Weekly Task Overview

Purpose:

Show completed tasks by day of the week.

Title:

```text
Weekly Task Overview
```

Dropdown label:

```text
This Week
```

Chart type:

- Bar chart
- Days from Monday to Sunday

X-axis labels:

```text
Mon, Tue, Wed, Thu, Fri, Sat, Sun
```

Legend:

```text
Tasks Completed
```

Data logic:

- Use `completedAt` to calculate completed tasks per day
- Only count tasks with `status === "completed"`
- If a task has no `completedAt`, do not count it in the weekly chart

---

### 9.2 Completion Rate

Purpose:

Show the percentage of completed tasks.

Title:

```text
Completion Rate
```

Dropdown label:

```text
This Month
```

Chart type:

- Donut chart

Center text:

```text
72%
Completed
```

Formula:

```js
completionRate = totalTasks === 0
  ? 0
  : Math.round((completedTasks / totalTasks) * 100);
```

Status breakdown:

- Completed, green
- In Progress, blue
- Not Started, soft purple or gray

If there are no tasks, show `0%`.

---

## 10. Daily Tasks Section

The Daily Tasks section is the main interactive area of the app.

### Section Header

Title:

```text
Daily Tasks
```

Controls:

- Search field
- Status filter dropdown
- Priority filter dropdown
- Sort dropdown
- `+ Add Task` button
- Optional compact menu for Export / Import / Clear All

### Search Field Placeholder

```text
Search tasks...
```

### Filters

Status filter:

- All Status
- Not Started
- In Progress
- Completed

Priority filter:

- All Priority
- High
- Medium
- Low

Sort dropdown:

- Due Date
- Priority
- Created Date

---

## 11. Daily Tasks Table

Table columns:

- Checkbox
- Task Name
- Priority
- Due Date
- Status
- Actions

### Each Row Should Show

- Checkbox
- Small task icon
- Task title
- Category as muted text under the title
- Priority badge
- Due date
- Status badge
- Edit icon button
- Delete icon button

---

## 12. Sample Tasks

Use these sample tasks when `localStorage` is empty.

```js
const sampleTasks = [
  {
    id: "sample-1",
    title: "Design dashboard UI",
    category: "UI Design",
    priority: "high",
    dueDate: "2026-07-10",
    status: "in-progress",
    createdAt: "2026-07-09T10:00:00.000Z",
    updatedAt: "2026-07-09T10:00:00.000Z",
    completedAt: null
  },
  {
    id: "sample-2",
    title: "Fix delete button bug",
    category: "Web App",
    priority: "high",
    dueDate: "2026-07-09",
    status: "in-progress",
    createdAt: "2026-07-09T10:05:00.000Z",
    updatedAt: "2026-07-09T10:05:00.000Z",
    completedAt: null
  },
  {
    id: "sample-3",
    title: "Read React documentation",
    category: "Learning",
    priority: "medium",
    dueDate: "2026-07-11",
    status: "not-started",
    createdAt: "2026-07-09T10:10:00.000Z",
    updatedAt: "2026-07-09T10:10:00.000Z",
    completedAt: null
  },
  {
    id: "sample-4",
    title: "Plan weekend study",
    category: "Personal",
    priority: "low",
    dueDate: "2026-07-12",
    status: "not-started",
    createdAt: "2026-07-09T10:15:00.000Z",
    updatedAt: "2026-07-09T10:15:00.000Z",
    completedAt: null
  },
  {
    id: "sample-5",
    title: "Review completed tasks",
    category: "Productivity",
    priority: "medium",
    dueDate: "2026-07-08",
    status: "completed",
    createdAt: "2026-07-09T10:20:00.000Z",
    updatedAt: "2026-07-09T10:20:00.000Z",
    completedAt: "2026-07-09T10:30:00.000Z"
  },
  {
    id: "sample-6",
    title: "Organize project files",
    category: "Admin",
    priority: "high",
    dueDate: "2026-07-13",
    status: "in-progress",
    createdAt: "2026-07-09T10:25:00.000Z",
    updatedAt: "2026-07-09T10:25:00.000Z",
    completedAt: null
  }
];
```

---

## 13. Task Data Model

Each task should use this structure:

```js
{
  id: "unique-id",
  title: "Design dashboard UI",
  category: "UI Design",
  priority: "high",
  dueDate: "2026-07-10",
  status: "in-progress",
  createdAt: "2026-07-09T10:00:00.000Z",
  updatedAt: "2026-07-09T10:00:00.000Z",
  completedAt: null
}
```

### Required Fields

- `id`
- `title`
- `priority`
- `dueDate`
- `status`
- `createdAt`
- `updatedAt`

### Optional Fields

- `category`
- `completedAt`

### Allowed Priority Values

```js
["high", "medium", "low"]
```

### Allowed Status Values

```js
["not-started", "in-progress", "completed"]
```

### ID Generation

Use:

```js
crypto.randomUUID()
```

Fallback if needed:

```js
Date.now().toString()
```

---

## 14. localStorage Keys

Use these keys:

```js
const STORAGE_KEYS = {
  tasks: "taskflow.tasks",
  theme: "taskflow.theme"
};
```

### Stored Task Data

Tasks should be stored as a JSON string.

```js
localStorage.setItem("taskflow.tasks", JSON.stringify(tasks));
```

### Stored Theme Data

Theme should be stored as:

```js
"light"
```

or

```js
"dark"
```

---

## 15. CRUD Behavior

### 15.1 Add Task

Required input fields:

- title
- priority
- dueDate
- status

Optional input fields:

- category

When adding a task:

- Generate a unique id
- Set `createdAt` to current ISO date string
- Set `updatedAt` to current ISO date string
- If status is `completed`, set `completedAt` to current ISO date string
- Otherwise set `completedAt` to `null`
- Save to `localStorage`
- Re-render dashboard and table

---

### 15.2 Edit Task

When editing a task:

- Update editable fields
- Set `updatedAt` to current ISO date string
- If status changes to `completed`, set `completedAt` if it does not already exist
- If status changes away from `completed`, set `completedAt` to `null`
- Save to `localStorage`
- Re-render dashboard and table

---

### 15.3 Delete Task

Before deleting:

- Show a confirmation dialog

After confirming:

- Remove task from the task array
- Save to `localStorage`
- Re-render dashboard and table

---

### 15.4 Change Task Status

Users should be able to change status from the table row.

When status changes:

- Update `status`
- Update `updatedAt`
- If new status is `completed`, set `completedAt`
- If new status is not `completed`, clear `completedAt`
- Save to `localStorage`
- Re-render dashboard and analytics

---

## 16. Search, Filter, and Sort Behavior

### Search

Search should match:

- Task title
- Task category

Search should be case-insensitive.

### Status Filter

Options:

- All Status
- Not Started
- In Progress
- Completed

### Priority Filter

Options:

- All Priority
- High
- Medium
- Low

### Sort Options

- Due Date
- Priority
- Created Date

### Combined Behavior

Search, filter, and sort should work together.

Processing order:

1. Start with all tasks
2. Apply search
3. Apply status filter
4. Apply priority filter
5. Apply sorting
6. Render result

---

## 17. Export, Import, and Clear Data

### 17.1 Export Data

Export all tasks as a JSON file.

Suggested filename:

```text
taskflow-backup.json
```

Export format:

```json
{
  "app": "TaskFlow",
  "version": "1.0.0",
  "exportedAt": "2026-07-09T10:00:00.000Z",
  "tasks": []
}
```

---

### 17.2 Import Data

Import tasks from a JSON file.

Accepted formats:

1. Full export object:

```json
{
  "app": "TaskFlow",
  "version": "1.0.0",
  "exportedAt": "2026-07-09T10:00:00.000Z",
  "tasks": []
}
```

2. Plain task array:

```json
[]
```

Before saving imported data:

- Validate that imported data is an array of tasks
- Validate required task fields
- Ignore or reject invalid items
- Save valid tasks to `localStorage`
- Re-render dashboard and table

Recommended behavior:

- Ask user to confirm before replacing current data

---

### 17.3 Clear All Data

Before clearing:

- Show confirmation dialog

After confirming:

- Remove `taskflow.tasks` from `localStorage`
- Reset task list to empty array
- Re-render dashboard and table

---

## 18. Empty States

### No Tasks

If there are no tasks, show:

```text
No tasks yet. Add your first task to get started.
```

### No Matching Results

If search or filters return no results, show:

```text
No matching tasks found.
```

---

## 19. Visual Style

The UI should feel:

- Clean
- Modern
- Friendly
- Minimal
- Polished
- Portfolio-quality
- Easy to read

### Color Palette

Use CSS variables:

```css
:root {
  --background: #F7F8FA;
  --card: #FFFFFF;
  --primary: #4F46E5;
  --secondary: #2563EB;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --text: #111827;
  --muted: #6B7280;
  --border: #E5E7EB;
}
```

### Dark Mode Palette

```css
[data-theme="dark"] {
  --background: #0F172A;
  --card: #111827;
  --primary: #818CF8;
  --secondary: #60A5FA;
  --success: #4ADE80;
  --warning: #FBBF24;
  --danger: #F87171;
  --text: #F9FAFB;
  --muted: #9CA3AF;
  --border: #1F2937;
}
```

### Card Style

Cards should use:

- White or dark card background depending on theme
- Rounded corners
- Soft shadow
- Subtle border
- Comfortable padding

Suggested CSS:

```css
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  padding: 24px;
}
```

---

## 20. Badge Styles

### Priority Badges

High:

- Soft red background
- Red text

Medium:

- Soft orange background
- Orange text

Low:

- Soft green background
- Green text

### Status Badges

Not Started:

- Soft purple or gray background
- Purple or gray text

In Progress:

- Soft blue background
- Blue text

Completed:

- Soft green background
- Green text

---

## 21. Forms and Modal Behavior

The add/edit task form can be shown as either:

- Modal dialog
- Slide-over panel
- Inline form

Recommended for version 1:

- Use a modal dialog

### Form Fields

- Task title
- Category
- Priority
- Due date
- Status

### Validation

Required fields:

- Task title
- Priority
- Due date
- Status

If a required field is missing, show a clear error message.

---

## 22. Accessibility Requirements

The app should include:

- Proper button labels
- Visible focus states
- Keyboard-accessible form controls
- Sufficient color contrast
- Semantic HTML where possible
- `aria-label` for icon-only buttons

Examples:

```html
<button aria-label="Edit task">...</button>
<button aria-label="Delete task">...</button>
```

---

## 23. Responsive Design

### Desktop

- Sidebar on the left
- Main content on the right
- Status cards in one row
- Analytics cards in two columns
- Daily Tasks as a table

### Tablet

- Sidebar can become narrower
- Status cards can wrap
- Analytics cards can stack if needed

### Mobile

- Sidebar should collapse or move into a top menu
- Status cards should stack vertically
- Analytics cards should stack vertically
- Daily Tasks table can become task cards

Mobile task card example:

```text
Design dashboard UI
UI Design
High • May 10, 2026 • In Progress
[Edit] [Delete]
```

---

## 24. Interaction Feedback

Show feedback after user actions.

Examples:

- Task added successfully
- Task updated successfully
- Task deleted
- Data exported
- Data imported successfully
- Invalid import file
- All data cleared

Feedback can be shown using:

- Toast notification
- Small alert banner
- Inline message

Recommended for version 1:

- Use toast notifications

---

## 25. Implementation Notes for Codex

When using Codex to implement this project:

1. Build the static layout first
2. Implement the task data model
3. Implement localStorage read/write
4. Render sample tasks
5. Implement Add / Edit / Delete
6. Implement status updates
7. Implement dashboard calculations
8. Implement search / filter / sort
9. Implement export / import / clear
10. Polish the UI
11. Test manually

Codex should avoid adding features that are not in this document unless explicitly requested.

---

## 26. Manual Testing Checklist

Before considering version 1 complete, test these cases:

- Add a new task
- Edit an existing task
- Delete a task
- Cancel delete confirmation
- Change task status to Completed
- Change task status away from Completed
- Refresh page and confirm tasks are still saved
- Search by title
- Search by category
- Filter by status
- Filter by priority
- Sort by due date
- Export JSON
- Import valid JSON
- Import invalid JSON
- Clear all data
- Toggle light/dark mode
- Refresh page and confirm theme is saved
- Check empty state
- Check no matching results state
- Check mobile layout

---

## 27. Version 1 Success Criteria

Version 1 is successful when:

- The dashboard looks close to the intended modern TaskFlow design
- Users can manage tasks fully with CRUD
- Data persists using localStorage
- Dashboard counts update automatically
- Completion rate updates automatically
- Search, filters, and sorting work correctly
- Export and import work correctly
- The UI is responsive enough for desktop, tablet, and mobile
- The project is simple enough to deploy on GitHub Pages, Netlify, or Vercel

---

## 28. Future Improvements

Future versions may include:

- User login
- Cloud database
- Sync between devices
- Team collaboration
- Task comments
- Real notifications
- Calendar integration
- Drag and drop task board
- Recurring tasks
- Pomodoro focus timer
- PWA offline support
- Analytics history

These features should not be implemented in version 1 unless requested.
