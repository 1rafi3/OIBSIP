/**
 * TaskMaster Pro - Stateful To-Do Web Application
 * Author: MD Sheik Rafiwol Karim Rafi
 * Track: Web Development & Designing (Oasis Infobyte OIBSIP - Level 2 Task 3)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. OASIS INFOBYTE VIDEO TITLE CARD CONTROLLER
  // ==========================================
  const titleCard = document.getElementById('video-title-card');
  const closeCardBtn = document.getElementById('close-title-card');
  const showCardBtn = document.getElementById('show-title-card-btn');

  let autoDismissTimer = setTimeout(() => {
    if (titleCard) titleCard.classList.add('hidden');
  }, 3000);

  if (closeCardBtn) {
    closeCardBtn.addEventListener('click', () => {
      clearTimeout(autoDismissTimer);
      if (titleCard) titleCard.classList.add('hidden');
    });
  }

  if (showCardBtn) {
    showCardBtn.addEventListener('click', () => {
      if (titleCard) titleCard.classList.remove('hidden');
    });
  }

  // ==========================================
  // 2. STATE MANAGEMENT & STORAGE
  // ==========================================
  const STORAGE_KEY = 'oibsip_taskmaster_tasks';
  let tasks = [];

  function loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        tasks = JSON.parse(stored);
      } else {
        // Seed initial tasks for immediate demonstration
        tasks = [
          {
            id: 'task-1',
            title: 'Complete Level 1 & Level 2 Oasis Infobyte Web Dev tasks',
            completed: false,
            priority: 'high',
            category: 'academics',
            createdAt: 'Today at 09:30 AM',
            completedAt: null
          },
          {
            id: 'task-2',
            title: 'Solve Daily LeetCode Challenge & practice Dynamic Programming',
            completed: false,
            priority: 'medium',
            category: 'dsa',
            createdAt: 'Today at 10:15 AM',
            completedAt: null
          },
          {
            id: 'task-3',
            title: 'Host personal portfolio on Vercel and link GitHub profile',
            completed: true,
            priority: 'high',
            category: 'development',
            createdAt: 'Yesterday',
            completedAt: 'Yesterday at 04:20 PM'
          }
        ];
        saveTasks();
      }
    } catch {
      tasks = [];
    }
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // ==========================================
  // 3. DOM REFERENCES
  // ==========================================
  const todoForm = document.getElementById('todo-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskPrioritySelect = document.getElementById('task-priority');
  const taskCategorySelect = document.getElementById('task-category');
  const searchInput = document.getElementById('search-input');
  const btnClearAll = document.getElementById('btn-clear-all');

  const pendingList = document.getElementById('pending-list');
  const completedList = document.getElementById('completed-list');
  const emptyPending = document.getElementById('empty-pending');
  const emptyCompleted = document.getElementById('empty-completed');

  const totalCountEl = document.getElementById('total-count');
  const pendingCountEl = document.getElementById('pending-count');
  const completedCountEl = document.getElementById('completed-count');
  const badgePendingCount = document.getElementById('badge-pending-count');
  const badgeCompletedCount = document.getElementById('badge-completed-count');
  const completionProgress = document.getElementById('completion-progress');
  const completionLabel = document.getElementById('completion-label');

  // ==========================================
  // 4. FORMATTING UTILITIES
  // ==========================================
  function getCurrentTimeString() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + now.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  // ==========================================
  // 5. RENDER ENGINE
  // ==========================================
  function render() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = tasks.filter(t => t.title.toLowerCase().includes(query));
    const pendingTasks = filtered.filter(t => !t.completed);
    const completedTasks = filtered.filter(t => t.completed);

    // Update Counters
    const totalCount = tasks.length;
    const pendingCount = tasks.filter(t => !t.completed).length;
    const completedCount = tasks.filter(t => t.completed).length;

    totalCountEl.textContent = totalCount;
    pendingCountEl.textContent = pendingCount;
    completedCountEl.textContent = completedCount;
    badgePendingCount.textContent = `${pendingCount} pending`;
    badgeCompletedCount.textContent = `${completedCount} completed`;

    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    completionProgress.style.width = `${percentage}%`;
    completionLabel.textContent = `${percentage}% Completed`;

    // Render Pending
    pendingList.innerHTML = '';
    if (pendingTasks.length === 0) {
      emptyPending.classList.remove('hidden');
    } else {
      emptyPending.classList.add('hidden');
      pendingTasks.forEach(task => pendingList.appendChild(createTaskElement(task)));
    }

    // Render Completed
    completedList.innerHTML = '';
    if (completedTasks.length === 0) {
      emptyCompleted.classList.remove('hidden');
    } else {
      emptyCompleted.classList.add('hidden');
      completedTasks.forEach(task => completedList.appendChild(createTaskElement(task)));
    }
  }

  // Create Individual Task DOM Card
  function createTaskElement(task) {
    const item = document.createElement('div');
    item.className = `task-item ${task.completed ? 'completed' : ''}`;
    item.id = `task-el-${task.id}`;

    // Header with checkbox, title, actions
    const header = document.createElement('div');
    header.className = 'task-header';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-toggle';
    checkbox.checked = task.completed;
    checkbox.title = task.completed ? 'Mark as Pending' : 'Mark as Complete';
    checkbox.addEventListener('change', () => toggleTaskComplete(task.id));

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.title;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-icon';
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Edit task';
    editBtn.addEventListener('click', () => initiateEdit(task, item, textSpan));

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon delete';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    header.appendChild(checkbox);
    header.appendChild(textSpan);
    header.appendChild(actions);

    // Meta row (Badges, Timestamp)
    const meta = document.createElement('div');
    meta.className = 'task-meta';

    const badges = document.createElement('div');
    badges.className = 'meta-badges';

    const priorityBadge = document.createElement('span');
    priorityBadge.className = `priority-tag priority-${task.priority}`;
    priorityBadge.textContent = task.priority;

    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-tag';
    categoryBadge.textContent = task.category;

    badges.appendChild(priorityBadge);
    badges.appendChild(categoryBadge);

    const timeSpan = document.createElement('span');
    timeSpan.className = 'timestamp';
    timeSpan.textContent = task.completed && task.completedAt 
      ? `Done: ${task.completedAt}` 
      : `Created: ${task.createdAt}`;

    meta.appendChild(badges);
    meta.appendChild(timeSpan);

    item.appendChild(header);
    item.appendChild(meta);

    return item;
  }

  // ==========================================
  // 6. TASK ACTIONS (ADD, TOGGLE, EDIT, DELETE)
  // ==========================================
  
  // Add Task
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskTitleInput.value.trim();
    if (!title) return;

    const newTask = {
      id: 'task-' + Date.now(),
      title,
      completed: false,
      priority: taskPrioritySelect.value,
      category: taskCategorySelect.value,
      createdAt: getCurrentTimeString(),
      completedAt: null
    };

    tasks.unshift(newTask);
    saveTasks();
    taskTitleInput.value = '';
    render();
  });

  // Toggle Complete
  function toggleTaskComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? getCurrentTimeString() : null;
      saveTasks();
      render();
    }
  }

  // Inline Edit
  function initiateEdit(task, itemElement, textSpan) {
    const currentText = task.title;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'inline-edit-input';
    input.value = currentText;

    textSpan.replaceWith(input);
    input.focus();

    function saveEdit() {
      const updated = input.value.trim();
      if (updated && updated !== currentText) {
        task.title = updated;
        saveTasks();
      }
      render();
    }

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.blur();
      } else if (e.key === 'Escape') {
        input.value = currentText;
        input.blur();
      }
    });
  }

  // Delete Single Task
  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
  }

  // Clear Completed
  btnClearAll.addEventListener('click', () => {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) return;
    if (confirm(`Remove all ${completedCount} completed tasks?`)) {
      tasks = tasks.filter(t => !t.completed);
      saveTasks();
      render();
    }
  });

  // Live Search Filter
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      render();
    });
  }

  // Initial Load
  loadTasks();
  render();
});
