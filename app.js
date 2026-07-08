const TASKS_KEY = "taskflow.tasks";
const THEME_KEY = "taskflow.theme";
const VALID_PRIORITIES = ["high", "medium", "low"];
const VALID_STATUSES = ["not-started", "in-progress", "completed"];

const labels = {
  priorities: {
    high: "High",
    medium: "Medium",
    low: "Low"
  },
  statuses: {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    completed: "Completed"
  }
};

const sampleTasks = [
  createSeedTask(1, "Review project brief", "Planning", "high", "2026-07-10", "in-progress"),
  createSeedTask(2, "Update task documentation", "Documentation", "high", "2026-07-09", "in-progress"),
  createSeedTask(3, "Read JavaScript documentation", "Learning", "medium", "2026-07-11", "not-started"),
  createSeedTask(4, "Plan weekend study", "Personal", "low", "2026-07-12", "not-started"),
  createSeedTask(5, "Fix delete button bug", "Web App", "medium", "2026-07-08", "completed", "2026-07-08T10:30:00.000Z"),
  createSeedTask(6, "Organize project files", "Admin", "high", "2026-07-13", "in-progress")
];

const initialCalendarDate = toDateInputValue(new Date());

const state = {
  tasks: loadTasks(),
  searchQuery: "",
  statusFilter: "all",
  priorityFilter: "all",
  sortOrder: "due-asc",
  calendarMonth: initialCalendarDate.slice(0, 7),
  selectedCalendarDate: initialCalendarDate,
  editingTaskId: null
};

const elements = {
  globalSearch: document.querySelector("#globalSearch"),
  taskSearch: document.querySelector("#taskSearch"),
  statusFilter: document.querySelector("#statusFilter"),
  priorityFilter: document.querySelector("#priorityFilter"),
  sortSelect: document.querySelector("#sortSelect"),
  taskTableBody: document.querySelector("#taskTableBody"),
  emptyState: document.querySelector("#emptyState"),
  emptyStateTitle: document.querySelector("#emptyStateTitle"),
  emptyStateMessage: document.querySelector("#emptyStateMessage"),
  taskDialog: document.querySelector("#taskDialog"),
  taskForm: document.querySelector("#taskForm"),
  taskId: document.querySelector("#taskId"),
  taskTitle: document.querySelector("#taskTitle"),
  taskCategory: document.querySelector("#taskCategory"),
  taskPriority: document.querySelector("#taskPriority"),
  taskStatus: document.querySelector("#taskStatus"),
  taskDueDate: document.querySelector("#taskDueDate"),
  modalEyebrow: document.querySelector("#modalEyebrow"),
  modalTitle: document.querySelector("#modalTitle"),
  notStartedCount: document.querySelector("#notStartedCount"),
  inProgressCount: document.querySelector("#inProgressCount"),
  completedCount: document.querySelector("#completedCount"),
  completionRate: document.querySelector("#completionRate"),
  completionDonut: document.querySelector("#completionDonut"),
  completionBreakdown: document.querySelector("#completionBreakdown"),
  weeklyChart: document.querySelector("#weeklyChart"),
  calendarMonthTitle: document.querySelector("#calendarMonthTitle"),
  calendarGrid: document.querySelector("#calendarGrid"),
  selectedDateTitle: document.querySelector("#selectedDateTitle"),
  selectedDateCount: document.querySelector("#selectedDateCount"),
  selectedDayTasks: document.querySelector("#selectedDayTasks"),
  noDueDateCount: document.querySelector("#noDueDateCount"),
  importInput: document.querySelector("#importInput"),
  themeToggle: document.querySelector("#themeToggle")
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  applyStoredTheme();
  bindEvents();
  render();
}

function bindEvents() {
  document.querySelector("#newTaskButton").addEventListener("click", openAddModal);
  document.querySelector("#addTaskButton").addEventListener("click", openAddModal);
  document.querySelector("#calendarAddButton").addEventListener("click", openAddModal);
  document.querySelector("#emptyAddButton").addEventListener("click", openAddModal);
  document.querySelector("#closeModalButton").addEventListener("click", closeModal);
  document.querySelector("#cancelModalButton").addEventListener("click", closeModal);
  document.querySelector("#exportButton").addEventListener("click", exportTasks);
  document.querySelector("#clearButton").addEventListener("click", clearAllData);
  document.querySelector("#prevMonthButton").addEventListener("click", () => changeCalendarMonth(-1));
  document.querySelector("#nextMonthButton").addEventListener("click", () => changeCalendarMonth(1));
  document.querySelector("#viewNoDueDateTasks").addEventListener("click", showTasksSection);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.importInput.addEventListener("change", importTasks);
  elements.taskForm.addEventListener("submit", saveTaskFromForm);
  elements.calendarGrid.addEventListener("click", handleCalendarDateClick);
  elements.selectedDayTasks.addEventListener("click", handleCalendarTaskClick);

  elements.globalSearch.addEventListener("input", syncSearch);
  elements.taskSearch.addEventListener("input", syncSearch);
  elements.statusFilter.addEventListener("change", (event) => {
    state.statusFilter = event.target.value;
    renderTasks();
  });
  elements.priorityFilter.addEventListener("change", (event) => {
    state.priorityFilter = event.target.value;
    renderTasks();
  });
  elements.sortSelect.addEventListener("change", (event) => {
    state.sortOrder = event.target.value;
    renderTasks();
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      elements.globalSearch.focus();
    }
  });
}

function createSeedTask(id, title, category, priority, dueDate, status, completedAt = null) {
  const now = "2026-07-08T08:00:00.000Z";
  return {
    id,
    title,
    category,
    priority,
    dueDate,
    status,
    createdAt: now,
    updatedAt: now,
    completedAt
  };
}

function loadTasks() {
  const savedTasks = localStorage.getItem(TASKS_KEY);
  if (!savedTasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(sampleTasks));
    return [...sampleTasks];
  }

  try {
    const parsed = JSON.parse(savedTasks);
    const source = Array.isArray(parsed) ? parsed : [];
    return source.map(normalizeImportedTask).filter(Boolean);
  } catch {
    localStorage.setItem(TASKS_KEY, JSON.stringify(sampleTasks));
    return [...sampleTasks];
  }
}

function persistTasks() {
  localStorage.setItem(TASKS_KEY, JSON.stringify(state.tasks));
}

function render() {
  renderSummary();
  renderWeeklyChart();
  renderCalendar();
  renderTasks();
}

function renderSummary() {
  const total = state.tasks.length;
  const counts = countByStatus(state.tasks);
  const completedRate = total === 0 ? 0 : Math.round((counts.completed / total) * 100);
  const completedDegrees = Math.round((completedRate / 100) * 360);
  const inProgressDegrees = total === 0 ? 0 : Math.round((counts["in-progress"] / total) * 360);

  elements.notStartedCount.textContent = counts["not-started"];
  elements.inProgressCount.textContent = counts["in-progress"];
  elements.completedCount.textContent = counts.completed;
  elements.completionRate.textContent = `${completedRate}%`;
  elements.completionDonut.style.background = `conic-gradient(
    var(--success) 0deg ${completedDegrees}deg,
    var(--primary-blue) ${completedDegrees}deg ${completedDegrees + inProgressDegrees}deg,
    #d8deea ${completedDegrees + inProgressDegrees}deg 360deg
  )`;

  elements.completionBreakdown.innerHTML = ["completed", "in-progress", "not-started"].map((status) => {
    const count = counts[status];
    const percent = total === 0 ? 0 : Math.round((count / total) * 100);
    return `
      <div class="breakdown-row breakdown-${status}">
        <span><i aria-hidden="true"></i>${labels.statuses[status]}</span>
        <strong><b>${percent}%</b> <em>(${count})</em></strong>
      </div>
    `;
  }).join("");
}

function renderWeeklyChart() {
  const days = getCurrentWeekDays();
  const counts = days.map(({ iso }) => {
    return state.tasks.filter((task) => task.completedAt && task.completedAt.slice(0, 10) === iso).length;
  });
  const topValue = Math.max(20, Math.ceil(Math.max(...counts) / 5) * 5);
  const yLabels = [topValue, Math.round(topValue * 0.75), Math.round(topValue * 0.5), Math.round(topValue * 0.25), 0];

  const bars = days.map((day, index) => {
    const value = counts[index];
    const height = value === 0 ? 0 : Math.max(7, Math.round((value / topValue) * 100));
    return `
      <div class="bar-item" title="${value} completed on ${day.label}">
        <strong class="bar-value">${value}</strong>
        <div class="bar-track">
          <div class="bar${value === 0 ? " empty" : ""}" style="height: ${height}%"></div>
        </div>
        <span class="bar-label">${day.label}</span>
      </div>
    `;
  }).join("");

  elements.weeklyChart.innerHTML = `
    <div class="chart-y-axis" aria-hidden="true">
      ${yLabels.map((label) => `<span>${label}</span>`).join("")}
    </div>
    <div class="chart-plot">
      ${bars}
    </div>
  `;
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  elements.taskTableBody.innerHTML = visibleTasks.map(renderTaskRow).join("");
  renderEmptyState(visibleTasks.length);

  elements.taskTableBody.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", handleTaskAction);
  });

  elements.taskTableBody.querySelectorAll("[data-status-select]").forEach((select) => {
    select.addEventListener("change", handleStatusSelect);
  });

  elements.taskTableBody.querySelectorAll("[data-complete-toggle]").forEach((checkbox) => {
    checkbox.addEventListener("change", handleCompleteToggle);
  });
}

function renderCalendar() {
  const monthDate = getCalendarMonthDate();
  const today = toDateInputValue(new Date());
  const selectedTasks = getTasksForDate(state.selectedCalendarDate).sort(sortCalendarTasks);
  const noDueDateTasks = state.tasks.filter((task) => !task.dueDate);

  elements.calendarMonthTitle.textContent = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric"
  }).format(monthDate);
  elements.calendarGrid.innerHTML = getCalendarMonthCells(monthDate).map((cell) => renderCalendarDayCell(cell, today)).join("");
  elements.selectedDateTitle.textContent = formatLongDate(state.selectedCalendarDate);
  elements.selectedDateCount.textContent = `${selectedTasks.length} task${selectedTasks.length === 1 ? "" : "s"}`;
  elements.noDueDateCount.textContent = noDueDateTasks.length;
  elements.selectedDayTasks.innerHTML = selectedTasks.length
    ? selectedTasks.map(renderSelectedDayTaskCard).join("")
    : `
      <div class="calendar-empty">
        <span>No tasks on this date</span>
        <small>Select another day or add a new task.</small>
      </div>
    `;
}

function renderCalendarDayCell(cell, today) {
  if (!cell.iso) {
    return `<span class="calendar-day-cell is-empty" aria-hidden="true"></span>`;
  }

  const dayTasks = getTasksForDate(cell.iso);
  const hasTasks = dayTasks.length > 0;
  const hasOverdue = cell.iso < today && dayTasks.some((task) => task.status !== "completed");
  const hasCompleted = dayTasks.some((task) => task.status === "completed");
  const classes = [
    "calendar-day-cell",
    cell.iso === today ? "is-today" : "",
    cell.iso === state.selectedCalendarDate ? "is-selected" : "",
    hasTasks ? "has-tasks" : "",
    hasOverdue ? "has-overdue" : "",
    hasCompleted ? "has-completed" : ""
  ].filter(Boolean).join(" ");

  return `
    <button class="${classes}" type="button" data-calendar-date="${cell.iso}" aria-pressed="${cell.iso === state.selectedCalendarDate}">
      <span class="calendar-day-number">${cell.day}</span>
      ${hasTasks ? `<span class="calendar-day-count">${dayTasks.length}</span>` : ""}
      ${hasTasks ? `<span class="calendar-day-indicators" aria-hidden="true">
        <i></i>
        ${hasOverdue ? "<i></i>" : ""}
        ${hasCompleted ? "<i></i>" : ""}
      </span>` : ""}
    </button>
  `;
}

function renderSelectedDayTaskCard(task) {
  return `
    <button class="calendar-task-card" type="button" data-calendar-edit="${task.id}" aria-label="Edit ${escapeHtml(task.title)}">
      <span class="calendar-task-title">${escapeHtml(task.title)}</span>
      <span class="calendar-task-category">${escapeHtml(task.category)}</span>
      <span class="calendar-task-topline">
        <span class="badge priority-${task.priority}">${labels.priorities[task.priority]}</span>
        <span class="badge status-${task.status}">${labels.statuses[task.status]}</span>
      </span>
    </button>
  `;
}

function getCalendarMonthCells(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlankCount = (firstDay.getDay() + 6) % 7;
  const cells = Array.from({ length: leadingBlankCount }, () => ({ iso: "", day: "" }));

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      iso: toDateInputValue(new Date(year, month, day)),
      day
    });
  }

  const trailingBlankCount = (7 - (cells.length % 7)) % 7;
  return cells.concat(Array.from({ length: trailingBlankCount }, () => ({ iso: "", day: "" })));
}

function getCalendarMonthDate() {
  const [year, month] = state.calendarMonth.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function getTasksForDate(dateValue) {
  return state.tasks.filter((task) => task.dueDate === dateValue);
}

function changeCalendarMonth(delta) {
  const monthDate = getCalendarMonthDate();
  const selectedDay = Number(state.selectedCalendarDate.slice(8, 10)) || 1;
  const targetMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + delta, 1);
  const daysInTargetMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();

  targetMonth.setDate(Math.min(selectedDay, daysInTargetMonth));
  state.calendarMonth = toMonthInputValue(targetMonth);
  state.selectedCalendarDate = toDateInputValue(targetMonth);
  renderCalendar();
}

function handleCalendarDateClick(event) {
  const day = event.target instanceof Element
    ? event.target.closest("[data-calendar-date]")
    : null;
  if (!day) return;

  state.selectedCalendarDate = day.dataset.calendarDate;
  state.calendarMonth = state.selectedCalendarDate.slice(0, 7);
  renderCalendar();
}

function showTasksSection() {
  location.hash = "tasks";
  document.querySelector("#tasks").scrollIntoView({ behavior: "smooth", block: "start" });
}

function sortCalendarTasks(a, b) {
  if (a.dueDate && b.dueDate && a.dueDate !== b.dueDate) {
    return Date.parse(`${a.dueDate}T00:00:00`) - Date.parse(`${b.dueDate}T00:00:00`);
  }

  const priorityRank = { high: 0, medium: 1, low: 2 };
  const rankResult = priorityRank[a.priority] - priorityRank[b.priority];
  if (rankResult !== 0) return rankResult;

  return String(a.title).localeCompare(String(b.title));
}

function handleCalendarTaskClick(event) {
  const card = event.target instanceof Element
    ? event.target.closest("[data-calendar-edit]")
    : null;
  if (!card) return;
  openEditModal(Number(card.dataset.calendarEdit));
}

function renderEmptyState(visibleTaskCount) {
  if (visibleTaskCount > 0) {
    elements.emptyState.hidden = true;
    return;
  }

  elements.emptyState.hidden = false;
  if (state.tasks.length === 0) {
    elements.emptyStateTitle.textContent = "No tasks yet";
    elements.emptyStateMessage.textContent = "Create your first task to start planning your day.";
    return;
  }

  elements.emptyStateTitle.textContent = "No matching tasks found";
  elements.emptyStateMessage.textContent = "Try changing your search, status filter, or priority filter.";
}

function renderTaskRow(task) {
  const isCompleted = task.status === "completed";
  return `
    <tr>
      <td data-label="Done">
        <input type="checkbox" data-complete-toggle="${task.id}" ${isCompleted ? "checked" : ""} aria-label="Mark ${escapeHtml(task.title)} complete">
      </td>
      <td data-label="Task">
        <div class="task-name">
          <span class="task-icon" aria-hidden="true">${task.category.slice(0, 1).toUpperCase()}</span>
          <div>
            <span class="task-title">${escapeHtml(task.title)}</span>
            <span class="task-category">${escapeHtml(task.category)}</span>
          </div>
        </div>
      </td>
      <td data-label="Priority">
        <span class="badge priority-${task.priority}">${labels.priorities[task.priority]}</span>
      </td>
      <td data-label="Due Date">${formatDate(task.dueDate)}</td>
      <td data-label="Status">
        <select class="status-select status-select-${task.status}" data-status-select="${task.id}" aria-label="Change status for ${escapeHtml(task.title)}">
          ${VALID_STATUSES.map((status) => `<option value="${status}" ${task.status === status ? "selected" : ""}>${labels.statuses[status]}</option>`).join("")}
        </select>
      </td>
      <td data-label="Actions">
        <div class="row-actions">
          <button class="action-button edit-action" type="button" data-action="edit" data-id="${task.id}" aria-label="Edit ${escapeHtml(task.title)}">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>
          </button>
          <button class="action-button delete-action" type="button" data-action="delete" data-id="${task.id}" aria-label="Delete ${escapeHtml(task.title)}">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3 6h18"></path>
              <path d="M8 6V4h8v2"></path>
              <path d="M19 6l-1 14H6L5 6"></path>
              <path d="M10 11v5"></path>
              <path d="M14 11v5"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `;
}

function getVisibleTasks() {
  const query = state.searchQuery.trim().toLowerCase();
  return state.tasks
    .filter((task) => {
      const matchesQuery = !query ||
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query);
      const matchesStatus = state.statusFilter === "all" || task.status === state.statusFilter;
      const matchesPriority = state.priorityFilter === "all" || task.priority === state.priorityFilter;
      return matchesQuery && matchesStatus && matchesPriority;
    })
    .sort(sortByDueDate);
}

function sortByDueDate(a, b) {
  if (!a.dueDate && !b.dueDate) {
    return String(a.title).localeCompare(String(b.title));
  }
  if (!a.dueDate) return 1;
  if (!b.dueDate) return -1;

  const aTime = Date.parse(`${a.dueDate}T00:00:00`);
  const bTime = Date.parse(`${b.dueDate}T00:00:00`);
  const result = aTime - bTime || String(a.title).localeCompare(String(b.title));
  return state.sortOrder === "due-desc" ? -result : result;
}

function syncSearch(event) {
  state.searchQuery = event.target.value;
  elements.globalSearch.value = state.searchQuery;
  elements.taskSearch.value = state.searchQuery;
  renderTasks();
}

function openAddModal() {
  state.editingTaskId = null;
  elements.modalEyebrow.textContent = "New task";
  elements.modalTitle.textContent = "Add Task";
  elements.taskForm.reset();
  elements.taskId.value = "";
  elements.taskPriority.value = "medium";
  elements.taskStatus.value = "not-started";
  openModal();
}

function openEditModal(taskId) {
  const task = findTask(taskId);
  if (!task) return;

  state.editingTaskId = task.id;
  elements.modalEyebrow.textContent = "Update task";
  elements.modalTitle.textContent = "Edit Task";
  elements.taskId.value = task.id;
  elements.taskTitle.value = task.title;
  elements.taskCategory.value = task.category;
  elements.taskPriority.value = task.priority;
  elements.taskStatus.value = task.status;
  elements.taskDueDate.value = task.dueDate || "";
  openModal();
}

function openModal() {
  if (typeof elements.taskDialog.showModal === "function") {
    elements.taskDialog.showModal();
  } else {
    elements.taskDialog.setAttribute("open", "");
  }
  elements.taskTitle.focus();
}

function closeModal() {
  elements.taskDialog.close();
}

function saveTaskFromForm(event) {
  event.preventDefault();
  const now = new Date().toISOString();
  const status = elements.taskStatus.value;
  const existingTask = state.editingTaskId ? findTask(state.editingTaskId) : null;
  const wasCompleted = existingTask?.status === "completed";
  const completedAt = status === "completed"
    ? existingTask?.completedAt || now
    : null;

  const taskData = {
    id: existingTask?.id || getNextId(),
    title: elements.taskTitle.value.trim(),
    category: elements.taskCategory.value.trim(),
    priority: elements.taskPriority.value,
    dueDate: elements.taskDueDate.value,
    status,
    createdAt: existingTask?.createdAt || now,
    updatedAt: now,
    completedAt: wasCompleted && status === "completed" ? existingTask.completedAt : completedAt
  };

  if (!taskData.title || !taskData.category) return;

  if (existingTask) {
    state.tasks = state.tasks.map((task) => task.id === existingTask.id ? taskData : task);
  } else {
    state.tasks = [...state.tasks, taskData];
  }

  persistAndRender();
  closeModal();
}

function handleTaskAction(event) {
  const id = Number(event.currentTarget.dataset.id);
  const action = event.currentTarget.dataset.action;

  if (action === "edit") {
    openEditModal(id);
    return;
  }

  if (action === "delete") {
    const task = findTask(id);
    if (task && window.confirm(`Delete "${task.title}"?\n\nThis action cannot be undone.`)) {
      state.tasks = state.tasks.filter((item) => item.id !== id);
      persistAndRender();
    }
  }
}

function handleStatusSelect(event) {
  const id = Number(event.currentTarget.dataset.statusSelect);
  updateTaskStatus(id, event.currentTarget.value);
}

function handleCompleteToggle(event) {
  const id = Number(event.currentTarget.dataset.completeToggle);
  updateTaskStatus(id, event.currentTarget.checked ? "completed" : "not-started");
}

function updateTaskStatus(id, status) {
  const now = new Date().toISOString();
  state.tasks = state.tasks.map((task) => {
    if (task.id !== id) return task;
    const nextStatus = VALID_STATUSES.includes(status) ? status : "not-started";
    return {
      ...task,
      status: nextStatus,
      updatedAt: now,
      completedAt: nextStatus === "completed" ? task.completedAt || now : null
    };
  });
  persistAndRender();
}

function exportTasks() {
  const payload = JSON.stringify(state.tasks, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `taskflow-tasks-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function importTasks(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const rawTasks = Array.isArray(parsed) ? parsed : parsed.tasks;
      if (!Array.isArray(rawTasks)) {
        window.alert("Import failed: JSON must be an array or an object with a tasks array.");
        return;
      }

      const normalized = rawTasks.map(normalizeImportedTask).filter(Boolean);
      if (normalized.length === 0) {
        window.alert("Import failed: no valid tasks found.");
        return;
      }

      const skipped = rawTasks.length - normalized.length;
      const message = `Import ${normalized.length} task${normalized.length === 1 ? "" : "s"} and replace your current tasks?${skipped ? `\n\n${skipped} invalid task${skipped === 1 ? " was" : "s were"} skipped.` : ""}`;
      if (window.confirm(message)) {
        state.tasks = normalized;
        persistAndRender();
      }
    } catch {
      window.alert("Import failed: invalid JSON file.");
    } finally {
      elements.importInput.value = "";
    }
  };
  reader.readAsText(file);
}

function normalizeImportedTask(task) {
  if (!task || typeof task !== "object") return null;
  const title = String(task.title || "").trim();
  const category = String(task.category || "").trim();
  if (!title || !category) return null;

  const now = new Date().toISOString();
  const priority = VALID_PRIORITIES.includes(String(task.priority).toLowerCase())
    ? String(task.priority).toLowerCase()
    : "medium";
  const status = VALID_STATUSES.includes(String(task.status).toLowerCase())
    ? String(task.status).toLowerCase()
    : "not-started";
  const dueDate = isValidDateInput(task.dueDate) ? task.dueDate : "";
  const completedAt = status === "completed" ? (isValidDateTime(task.completedAt) ? task.completedAt : now) : null;

  return {
    id: Number.isFinite(Number(task.id)) ? Number(task.id) : getNextId(),
    title,
    category,
    priority,
    dueDate,
    status,
    createdAt: isValidDateTime(task.createdAt) ? task.createdAt : now,
    updatedAt: isValidDateTime(task.updatedAt) ? task.updatedAt : now,
    completedAt
  };
}

function clearAllData() {
  if (!window.confirm("Clear all local TaskFlow data?\n\nThis action cannot be undone.")) return;
  state.tasks = [];
  persistAndRender();
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
  elements.themeToggle.textContent = next === "dark" ? "L" : "D";
}

function applyStoredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  document.documentElement.dataset.theme = savedTheme;
  elements.themeToggle.textContent = savedTheme === "dark" ? "L" : "D";
}

function countByStatus(tasks) {
  return tasks.reduce((counts, task) => {
    counts[task.status] += 1;
    return counts;
  }, {
    "not-started": 0,
    "in-progress": 0,
    completed: 0
  });
}

function getCurrentWeekDays() {
  const today = new Date();
  const monday = new Date(today);
  const day = today.getDay() || 7;
  monday.setDate(today.getDate() - day + 1);
  monday.setHours(0, 0, 0, 0);

  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      label,
      iso: toDateInputValue(date)
    };
  });
}

function persistAndRender() {
  persistTasks();
  render();
}

function findTask(id) {
  return state.tasks.find((task) => task.id === id);
}

function getNextId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function formatDate(value) {
  if (!value) return "No due date";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "No due date";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function formatLongDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Selected date";
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toMonthInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function isValidDateInput(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00`));
}

function isValidDateTime(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
