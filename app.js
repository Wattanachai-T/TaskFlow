const TASKS_KEY = "taskflow.tasks";
const THEME_KEY = "taskflow.theme";
const LANG_KEY = "taskflow.lang";
const VALID_PRIORITIES = ["high", "medium", "low"];
const VALID_STATUSES = ["not-started", "in-progress", "completed"];
const VALID_ICONS = ["task", "code", "book", "clipboard", "file", "folder", "calendar", "user", "check", "star"];

const iconAssetPaths = {
  analytics: "assets/icons/raw/analytics-business-chart-finance-graph-money-svgrepo-com.svg",
  task: "assets/icons/raw/tasks-app-svgrepo-com.svg",
  code: "assets/icons/raw/com-laptop-code-svgrepo-com.svg",
  book: "assets/icons/raw/book-closed-svgrepo-com.svg",
  clipboard: "assets/icons/raw/clipboard-checklist-2-svgrepo-com.svg",
  file: "assets/icons/raw/file-folder-2-svgrepo-com.svg",
  folder: "assets/icons/raw/folder-alt-svgrepo-com.svg",
  calendar: "assets/icons/raw/calendar-svgrepo-com.svg",
  user: "assets/icons/raw/people-svgrepo-com.svg",
  check: "assets/icons/raw/check-mark-circle-svgrepo-com.svg",
  star: "assets/icons/raw/star-fall-svgrepo-com.svg",
  dashboard: "assets/icons/raw/dashboard-svgrepo-com.svg",
  settings: "assets/icons/raw/setting-2-svgrepo-com.svg"
};

const translations = {
  en: {
    ui: {
      documentTitle: "TaskFlow Dashboard",
      dashboard: "Dashboard",
      goodMorning: "Good morning",
      summaryToday: "Here is your task summary for today.",
      globalSearchPlaceholder: "Search tasks, projects, or tags...",
      taskSearchPlaceholder: "Search tasks...",
      newTask: "New Task",
      addTask: "Add Task",
      notStarted: "Not Started",
      inProgress: "In Progress",
      completed: "Completed",
      tasksReady: "Tasks ready to begin",
      tasksMoving: "Tasks moving forward",
      tasksWrapped: "Tasks wrapped up",
      weeklyTaskOverview: "Weekly Task Overview",
      completionRate: "Completion Rate",
      dailyTasks: "Daily Tasks",
      exportJson: "Export JSON",
      importJson: "Import JSON",
      clearData: "Clear Data",
      allStatus: "All Status",
      allPriority: "All Priority",
      dueDateAsc: "Due Date Asc",
      dueDateDesc: "Due Date Desc",
      taskName: "Task Name",
      priority: "Priority",
      dueDate: "Due Date",
      status: "Status",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      tasks: "Tasks",
      calendar: "Calendar",
      analytics: "Analytics",
      settings: "Settings",
      localFirst: "Local-first",
      yourTasksStayHere: "Your tasks stay here",
      localDataMessage: "TaskFlow stores data in this browser only. Export JSON anytime to keep a backup.",
      demoUser: "Demo User",
      overview: "Overview",
      progress: "Progress",
      thisWeek: "This Week",
      thisMonth: "This Month",
      tasksCompleted: "Tasks Completed",
      plan: "Plan",
      selectedDate: "Selected Date",
      noDueDate: "No Due Date",
      tasksWithoutDueDate: "tasks without a due date",
      viewInTasks: "View in Tasks",
      manage: "Manage",
      taskTitleLabel: "Task Title",
      category: "Category",
      taskIcon: "Task Icon",
      cancel: "Cancel",
      saveTask: "Save Task",
      addNewTask: "Add New Task",
      addTaskSubtitle: "Create a new task and organize your workflow.",
      editTaskSubtitle: "Update task details and keep your workflow organized.",
      saveChanges: "Save Changes",
      taskNameRequired: "Task name is required.",
      updateTask: "Update task",
      editTask: "Edit Task",
      noTasksYet: "No tasks yet",
      createFirstTask: "Create your first task to start planning your day.",
      noMatchingTasks: "No matching tasks found",
      tryChangingFilters: "Try changing your search, status filter, or priority filter.",
      noTasksOnDate: "No tasks on this date",
      selectAnotherDay: "Select another day or add a new task.",
      noDueDateLabel: "No due date",
      selectedDateFallback: "Selected date",
      toggleLanguage: "Toggle language",
      toggleTheme: "Toggle theme",
      closeModal: "Close modal",
      filterByStatus: "Filter by status",
      filterByPriority: "Filter by priority",
      sortByDueDate: "Sort by due date",
      markComplete: "Mark {title} complete",
      changeStatusFor: "Change status for {title}",
      editTaskNamed: "Edit {title}",
      deleteTaskNamed: "Delete {title}",
      deleteConfirm: "Delete \"{title}\"?\n\nThis action cannot be undone.",
      clearConfirm: "Clear all local TaskFlow data?\n\nThis action cannot be undone.",
      selectedTaskCount: "{count} task",
      selectedTasksCount: "{count} tasks"
    },
    priorities: {
      high: "High",
      medium: "Medium",
      low: "Low"
    },
    statuses: {
      "not-started": "Not Started",
      "in-progress": "In Progress",
      completed: "Completed"
    },
    weekdaysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    locale: "en-US"
  },
  th: {
    ui: {
      documentTitle: "TaskFlow แดชบอร์ด",
      dashboard: "แดชบอร์ด",
      goodMorning: "สวัสดี",
      summaryToday: "นี่คือภาพรวมงานของคุณวันนี้",
      globalSearchPlaceholder: "ค้นหางาน โปรเจกต์ หรือแท็ก...",
      taskSearchPlaceholder: "ค้นหางาน...",
      newTask: "งานใหม่",
      addTask: "เพิ่มงาน",
      notStarted: "ยังไม่เริ่ม",
      inProgress: "กำลังทำ",
      completed: "เสร็จแล้ว",
      tasksReady: "งานที่รอเริ่ม",
      tasksMoving: "งานที่กำลังดำเนินการ",
      tasksWrapped: "งานที่เสร็จแล้ว",
      weeklyTaskOverview: "ภาพรวมงานรายสัปดาห์",
      completionRate: "อัตราการทำงานเสร็จ",
      dailyTasks: "งานประจำวัน",
      exportJson: "ส่งออก JSON",
      importJson: "นำเข้า JSON",
      clearData: "ล้างข้อมูล",
      allStatus: "ทุกสถานะ",
      allPriority: "ทุกความสำคัญ",
      dueDateAsc: "วันครบกำหนด ↑",
      dueDateDesc: "วันครบกำหนด ↓",
      taskName: "ชื่องาน",
      priority: "ความสำคัญ",
      dueDate: "วันครบกำหนด",
      status: "สถานะ",
      actions: "จัดการ",
      edit: "แก้ไข",
      delete: "ลบ",
      tasks: "งาน",
      calendar: "ปฏิทิน",
      analytics: "วิเคราะห์",
      settings: "ตั้งค่า",
      localFirst: "เก็บข้อมูลในเครื่อง",
      yourTasksStayHere: "งานของคุณอยู่ที่นี่",
      localDataMessage: "TaskFlow เก็บข้อมูลไว้ในเบราว์เซอร์นี้เท่านั้น คุณสามารถส่งออก JSON เพื่อสำรองข้อมูลได้ทุกเมื่อ",
      demoUser: "ผู้ใช้ตัวอย่าง",
      overview: "ภาพรวม",
      progress: "ความคืบหน้า",
      thisWeek: "สัปดาห์นี้",
      thisMonth: "เดือนนี้",
      tasksCompleted: "งานที่เสร็จแล้ว",
      plan: "วางแผน",
      selectedDate: "วันที่เลือก",
      noDueDate: "ไม่มีวันครบกำหนด",
      tasksWithoutDueDate: "งานที่ยังไม่มีวันครบกำหนด",
      viewInTasks: "ดูในงาน",
      manage: "จัดการ",
      taskTitleLabel: "ชื่องาน",
      category: "หมวดหมู่",
      taskIcon: "ไอคอนงาน",
      cancel: "ยกเลิก",
      saveTask: "บันทึกงาน",
      addNewTask: "เพิ่มงานใหม่",
      addTaskSubtitle: "สร้างงานใหม่และกำหนดรายละเอียดของงาน",
      editTaskSubtitle: "แก้ไขรายละเอียดงานของคุณ",
      saveChanges: "บันทึกการแก้ไข",
      taskNameRequired: "กรุณากรอกชื่องาน",
      updateTask: "อัปเดตงาน",
      editTask: "แก้ไขงาน",
      noTasksYet: "ยังไม่มีงาน",
      createFirstTask: "สร้างงานแรกเพื่อเริ่มวางแผนวันของคุณ",
      noMatchingTasks: "ไม่พบงานที่ตรงกัน",
      tryChangingFilters: "ลองเปลี่ยนคำค้นหา สถานะ หรือตัวกรองความสำคัญ",
      noTasksOnDate: "ไม่มีงานในวันนี้",
      selectAnotherDay: "เลือกวันอื่นหรือเพิ่มงานใหม่",
      noDueDateLabel: "ไม่มีวันครบกำหนด",
      selectedDateFallback: "วันที่เลือก",
      toggleLanguage: "สลับภาษา",
      toggleTheme: "สลับธีม",
      closeModal: "ปิดหน้าต่าง",
      filterByStatus: "กรองตามสถานะ",
      filterByPriority: "กรองตามความสำคัญ",
      sortByDueDate: "เรียงตามวันครบกำหนด",
      markComplete: "ทำเครื่องหมายว่า {title} เสร็จแล้ว",
      changeStatusFor: "เปลี่ยนสถานะของ {title}",
      editTaskNamed: "แก้ไข {title}",
      deleteTaskNamed: "ลบ {title}",
      deleteConfirm: "ลบ \"{title}\"?\n\nการกระทำนี้ไม่สามารถย้อนกลับได้",
      clearConfirm: "ล้างข้อมูล TaskFlow ทั้งหมดในเครื่องนี้?\n\nการกระทำนี้ไม่สามารถย้อนกลับได้",
      selectedTaskCount: "{count} งาน",
      selectedTasksCount: "{count} งาน"
    },
    priorities: {
      high: "สูง",
      medium: "กลาง",
      low: "ต่ำ"
    },
    statuses: {
      "not-started": "ยังไม่เริ่ม",
      "in-progress": "กำลังทำ",
      completed: "เสร็จแล้ว"
    },
    weekdaysShort: ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."],
    locale: "th-TH"
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
  lang: loadLanguage(),
  searchQuery: "",
  statusFilter: "all",
  priorityFilter: "all",
  sortOrder: "due-asc",
  calendarMonth: initialCalendarDate.slice(0, 7),
  selectedCalendarDate: initialCalendarDate,
  editingTaskId: null,
  selectedTaskIcon: "task",
  iconManuallySelected: false
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
  taskIconPicker: document.querySelector("#taskIconPicker"),
  taskPriority: document.querySelector("#taskPriority"),
  taskStatus: document.querySelector("#taskStatus"),
  taskDueDate: document.querySelector("#taskDueDate"),
  modalTitle: document.querySelector("#modalTitle"),
  modalSubtitle: document.querySelector("#modalSubtitle"),
  taskTitleError: document.querySelector("#taskTitleError"),
  taskSubmitButton: document.querySelector("#taskSubmitButton"),
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
  languageToggle: document.querySelector("#languageToggle"),
  themeToggle: document.querySelector("#themeToggle")
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  applyStoredTheme();
  bindEvents();
  applyLanguage();
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
  elements.languageToggle.addEventListener("click", toggleLanguage);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.importInput.addEventListener("change", importTasks);
  elements.taskForm.addEventListener("submit", saveTaskFromForm);
  elements.taskTitle.addEventListener("input", clearTaskTitleError);
  elements.taskCategory.addEventListener("input", handleTaskCategoryInput);
  elements.taskIconPicker.addEventListener("click", handleIconPickerClick);
  document.addEventListener("error", handleIconImageError, true);
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
    icon: inferCategoryIconName(category),
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

function loadLanguage() {
  const savedLanguage = localStorage.getItem(LANG_KEY);
  return savedLanguage === "th" ? "th" : "en";
}

function t(key, replacements = {}) {
  const dictionary = translations[state.lang]?.ui || translations.en.ui;
  const fallback = translations.en.ui[key] || key;
  const template = dictionary[key] || fallback;
  return Object.entries(replacements).reduce((value, [name, replacement]) => {
    return value.replaceAll(`{${name}}`, replacement);
  }, template);
}

function getPriorityLabel(priority) {
  return translations[state.lang]?.priorities?.[priority] || translations.en.priorities[priority] || priority;
}

function getStatusLabel(status) {
  return translations[state.lang]?.statuses?.[status] || translations.en.statuses[status] || status;
}

function getLocale() {
  return translations[state.lang]?.locale || translations.en.locale;
}

function getWeekdayLabels() {
  return translations[state.lang]?.weekdaysShort || translations.en.weekdaysShort;
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.title = t("documentTitle");
  elements.languageToggle.textContent = state.lang.toUpperCase();
  elements.languageToggle.setAttribute("aria-label", t("toggleLanguage"));
  elements.themeToggle.setAttribute("aria-label", t("toggleTheme"));
  elements.taskIconPicker.setAttribute("aria-label", t("taskIcon"));
  document.querySelector("#closeModalButton").setAttribute("aria-label", t("closeModal"));
  updateModalCopy();
  if (elements.taskTitleError.textContent) {
    elements.taskTitleError.textContent = t("taskNameRequired");
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll(".calendar-weekdays span").forEach((element, index) => {
    element.textContent = getWeekdayLabels()[index];
  });

  updateSelectOptionLabels();
  renderIconPicker();
}

function updateModalCopy() {
  const isEditing = Boolean(state.editingTaskId);
  elements.modalTitle.textContent = isEditing ? t("editTask") : t("addNewTask");
  elements.modalSubtitle.textContent = isEditing ? t("editTaskSubtitle") : t("addTaskSubtitle");
  elements.taskSubmitButton.textContent = isEditing ? t("saveChanges") : t("addTask");
}

function updateSelectOptionLabels() {
  setSelectOptions(elements.statusFilter, [
    ["all", t("allStatus")],
    ["not-started", getStatusLabel("not-started")],
    ["in-progress", getStatusLabel("in-progress")],
    ["completed", getStatusLabel("completed")]
  ]);

  setSelectOptions(elements.priorityFilter, [
    ["all", t("allPriority")],
    ["high", getPriorityLabel("high")],
    ["medium", getPriorityLabel("medium")],
    ["low", getPriorityLabel("low")]
  ]);

  setSelectOptions(elements.sortSelect, [
    ["due-asc", t("dueDateAsc")],
    ["due-desc", t("dueDateDesc")]
  ]);

  setSelectOptions(elements.taskPriority, [
    ["high", getPriorityLabel("high")],
    ["medium", getPriorityLabel("medium")],
    ["low", getPriorityLabel("low")]
  ]);

  setSelectOptions(elements.taskStatus, [
    ["not-started", getStatusLabel("not-started")],
    ["in-progress", getStatusLabel("in-progress")],
    ["completed", getStatusLabel("completed")]
  ]);

  elements.statusFilter.setAttribute("aria-label", t("filterByStatus"));
  elements.priorityFilter.setAttribute("aria-label", t("filterByPriority"));
  elements.sortSelect.setAttribute("aria-label", t("sortByDueDate"));
}

function setSelectOptions(select, options) {
  const currentValue = select.value;
  select.innerHTML = options.map(([value, label]) => {
    return `<option value="${value}">${escapeHtml(label)}</option>`;
  }).join("");
  select.value = currentValue;
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
        <span><i aria-hidden="true"></i>${getStatusLabel(status)}</span>
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
      <div class="bar-item" title="${value} ${t("tasksCompleted").toLowerCase()}">
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

  elements.calendarMonthTitle.textContent = new Intl.DateTimeFormat(getLocale(), {
    month: "long",
    year: "numeric"
  }).format(monthDate);
  elements.calendarGrid.innerHTML = getCalendarMonthCells(monthDate).map((cell) => renderCalendarDayCell(cell, today)).join("");
  elements.selectedDateTitle.textContent = formatLongDate(state.selectedCalendarDate);
  elements.selectedDateCount.textContent = selectedTasks.length === 1
    ? t("selectedTaskCount", { count: selectedTasks.length })
    : t("selectedTasksCount", { count: selectedTasks.length });
  elements.noDueDateCount.textContent = noDueDateTasks.length;
  elements.selectedDayTasks.innerHTML = selectedTasks.length
    ? selectedTasks.map(renderSelectedDayTaskCard).join("")
    : `
      <div class="calendar-empty">
        <span>${t("noTasksOnDate")}</span>
        <small>${t("selectAnotherDay")}</small>
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
    <button class="calendar-task-card" type="button" data-calendar-edit="${task.id}" aria-label="${escapeHtml(t("editTaskNamed", { title: task.title }))}">
      <span class="calendar-task-title">${escapeHtml(task.title)}</span>
      <span class="calendar-task-category">${escapeHtml(task.category)}</span>
      <span class="calendar-task-topline">
        <span class="badge priority-${task.priority}">${getPriorityLabel(task.priority)}</span>
        <span class="badge status-${task.status}">${getStatusLabel(task.status)}</span>
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
    elements.emptyStateTitle.textContent = t("noTasksYet");
    elements.emptyStateMessage.textContent = t("createFirstTask");
    return;
  }

  elements.emptyStateTitle.textContent = t("noMatchingTasks");
  elements.emptyStateMessage.textContent = t("tryChangingFilters");
}

function inferCategoryIconName(category) {
  const normalizedCategory = String(category || "").trim().toLowerCase();
  const iconNameByCategory = {
    coding: "code",
    "web app": "code",
    development: "code",
    learning: "book",
    study: "book",
    planning: "clipboard",
    documentation: "file",
    personal: "user",
    admin: "folder",
    meeting: "calendar",
    productivity: "check"
  };

  return iconNameByCategory[normalizedCategory] || "task";
}

function normalizeIconName(icon, category = "") {
  const normalizedIcon = String(icon || "").trim().toLowerCase();
  return VALID_ICONS.includes(normalizedIcon) ? normalizedIcon : inferCategoryIconName(category);
}

function getTaskIconName(task) {
  return normalizeIconName(task?.icon, task?.category);
}

function getIconPath(iconName) {
  const safeIconName = VALID_ICONS.includes(iconName) ? iconName : "task";
  return iconAssetPaths[safeIconName] || iconAssetPaths.task;
}

function getIconImage(iconName, className) {
  return `<img class="${className}" src="${escapeHtml(getIconPath(iconName))}" alt="" aria-hidden="true" loading="lazy">`;
}

function renderIconPicker() {
  elements.taskIconPicker.innerHTML = VALID_ICONS.map((iconName) => {
    const isSelected = state.selectedTaskIcon === iconName;
    return `
      <button class="icon-option${isSelected ? " active" : ""}" type="button" data-icon-option="${iconName}" aria-label="${escapeHtml(t("taskIcon"))}: ${iconName}" aria-pressed="${isSelected}">
        ${getIconImage(iconName, "icon-picker-img")}
      </button>
    `;
  }).join("");
}

function setSelectedTaskIcon(iconName, manuallySelected = false) {
  state.selectedTaskIcon = normalizeIconName(iconName);
  state.iconManuallySelected = manuallySelected;
  renderIconPicker();
}

function handleIconPickerClick(event) {
  const button = event.target instanceof Element
    ? event.target.closest("[data-icon-option]")
    : null;
  if (!button) return;
  setSelectedTaskIcon(button.dataset.iconOption, true);
}

function handleTaskCategoryInput() {
  if (state.iconManuallySelected) return;
  setSelectedTaskIcon(inferCategoryIconName(elements.taskCategory.value));
}

function handleIconImageError(event) {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) return;
  if (!image.classList.contains("task-icon-img") && !image.classList.contains("icon-picker-img")) return;
  if (image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = iconAssetPaths.task;
}

function renderTaskRow(task) {
  const isCompleted = task.status === "completed";
  return `
    <tr>
      <td data-label="${t("completed")}">
        <input type="checkbox" data-complete-toggle="${task.id}" ${isCompleted ? "checked" : ""} aria-label="${escapeHtml(t("markComplete", { title: task.title }))}">
      </td>
      <td data-label="${t("tasks")}">
        <div class="task-name">
          <span class="task-icon" aria-hidden="true">${getIconImage(getTaskIconName(task), "task-icon-img")}</span>
          <div>
            <span class="task-title">${escapeHtml(task.title)}</span>
            <span class="task-category">${escapeHtml(task.category)}</span>
          </div>
        </div>
      </td>
      <td data-label="${t("priority")}">
        <span class="badge priority-${task.priority}">${getPriorityLabel(task.priority)}</span>
      </td>
      <td data-label="${t("dueDate")}">${formatDate(task.dueDate)}</td>
      <td data-label="${t("status")}">
        <select class="status-select status-select-${task.status}" data-status-select="${task.id}" aria-label="${escapeHtml(t("changeStatusFor", { title: task.title }))}">
          ${VALID_STATUSES.map((status) => `<option value="${status}" ${task.status === status ? "selected" : ""}>${getStatusLabel(status)}</option>`).join("")}
        </select>
      </td>
      <td data-label="${t("actions")}">
        <div class="row-actions">
          <button class="action-button edit-action" type="button" data-action="edit" data-id="${task.id}" aria-label="${escapeHtml(t("editTaskNamed", { title: task.title }))}" title="${t("edit")}">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>
          </button>
          <button class="action-button delete-action" type="button" data-action="delete" data-id="${task.id}" aria-label="${escapeHtml(t("deleteTaskNamed", { title: task.title }))}" title="${t("delete")}">
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
  updateModalCopy();
  clearTaskTitleError();
  elements.taskForm.reset();
  elements.taskId.value = "";
  elements.taskPriority.value = "medium";
  elements.taskStatus.value = "not-started";
  setSelectedTaskIcon(inferCategoryIconName(elements.taskCategory.value));
  openModal();
}

function openEditModal(taskId) {
  const task = findTask(taskId);
  if (!task) return;

  state.editingTaskId = task.id;
  updateModalCopy();
  clearTaskTitleError();
  elements.taskId.value = task.id;
  elements.taskTitle.value = task.title;
  elements.taskCategory.value = task.category;
  elements.taskPriority.value = task.priority;
  elements.taskStatus.value = task.status;
  elements.taskDueDate.value = task.dueDate || "";
  setSelectedTaskIcon(getTaskIconName(task), Boolean(task.icon && VALID_ICONS.includes(String(task.icon).toLowerCase())));
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
  clearTaskTitleError();
  elements.taskDialog.close();
}

function showTaskTitleError() {
  elements.taskTitle.setAttribute("aria-invalid", "true");
  elements.taskTitleError.textContent = t("taskNameRequired");
}

function clearTaskTitleError() {
  elements.taskTitle.setAttribute("aria-invalid", "false");
  elements.taskTitleError.textContent = "";
}

function saveTaskFromForm(event) {
  event.preventDefault();
  const title = elements.taskTitle.value.trim();
  if (!title) {
    showTaskTitleError();
    elements.taskTitle.focus();
    return;
  }
  if (!elements.taskForm.reportValidity()) return;

  const now = new Date().toISOString();
  const status = elements.taskStatus.value;
  const existingTask = state.editingTaskId ? findTask(state.editingTaskId) : null;
  const wasCompleted = existingTask?.status === "completed";
  const completedAt = status === "completed"
    ? existingTask?.completedAt || now
    : null;

  const taskData = {
    id: existingTask?.id || getNextId(),
    title,
    category: elements.taskCategory.value.trim(),
    icon: normalizeIconName(state.selectedTaskIcon, elements.taskCategory.value),
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
    if (task && window.confirm(t("deleteConfirm", { title: task.title }))) {
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
    icon: normalizeIconName(task.icon, category),
    priority,
    dueDate,
    status,
    createdAt: isValidDateTime(task.createdAt) ? task.createdAt : now,
    updatedAt: isValidDateTime(task.updatedAt) ? task.updatedAt : now,
    completedAt
  };
}

function clearAllData() {
  if (!window.confirm(t("clearConfirm"))) return;
  state.tasks = [];
  persistAndRender();
}

function toggleLanguage() {
  state.lang = state.lang === "en" ? "th" : "en";
  localStorage.setItem(LANG_KEY, state.lang);
  applyLanguage();
  render();
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

  return getWeekdayLabels().map((label, index) => {
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
  if (!value) return t("noDueDateLabel");
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return t("noDueDateLabel");
  return new Intl.DateTimeFormat(getLocale(), {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function formatLongDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return t("selectedDateFallback");
  return new Intl.DateTimeFormat(getLocale(), {
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
