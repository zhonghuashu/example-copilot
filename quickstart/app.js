// Task Manager App Script
// Accessible, responsive, modern JS

document.addEventListener('DOMContentLoaded', () => {
  // Task search elements
  const searchForm = document.getElementById('task-search-form');
  const searchInput = document.getElementById('task-search-input');
  let searchQuery = '';

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      renderTasks();
    });
    // Optional: prevent form submit
    if (searchForm) {
      searchForm.addEventListener('submit', e => e.preventDefault());
    }
  }
  // Social sharing functionality
  const shareUrl = window.location.href;
  const shareTitle = document.title;
  const facebookBtn = document.getElementById('share-facebook');
  const twitterBtn = document.getElementById('share-twitter');
  const linkedinBtn = document.getElementById('share-linkedin');

  function openShareWindow(url) {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  }

  if (facebookBtn) {
    facebookBtn.addEventListener('click', () => {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      openShareWindow(url);
    });
  }
  if (twitterBtn) {
    twitterBtn.addEventListener('click', () => {
      const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
      openShareWindow(url);
    });
  }
  if (linkedinBtn) {
    linkedinBtn.addEventListener('click', () => {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      openShareWindow(url);
    });
  }
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const darkToggle = document.getElementById('dark-mode-toggle');

  // Dark mode state
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let darkMode = localStorage.getItem('darkMode');
  if (darkMode === null) darkMode = prefersDark ? 'on' : 'off';
  setDarkMode(darkMode === 'on');

  darkToggle.addEventListener('click', () => {
    darkMode = document.body.classList.toggle('dark-mode') ? 'on' : 'off';
    localStorage.setItem('darkMode', darkMode);
    updateDarkToggle();
  });

  function setDarkMode(on) {
    document.body.classList.toggle('dark-mode', on);
    updateDarkToggle();
  }
  function updateDarkToggle() {
    if (document.body.classList.contains('dark-mode')) {
      darkToggle.classList.add('active');
      darkToggle.textContent = '☀️ Light Mode';
      darkToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      darkToggle.classList.remove('active');
      darkToggle.textContent = '🌙 Dark Mode';
      darkToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  let currentFilter = 'all';

  renderTasks();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) {
      input.classList.add('input-error');
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
    tasks.push({ text, completed: false });
    input.value = '';
    saveTasks();
    renderTasks();
  });

  input.addEventListener('input', () => {
    if (input.value.trim()) {
      input.classList.remove('input-error');
      input.removeAttribute('aria-invalid');
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  function renderTasks() {
    list.innerHTML = '';
    let filtered = tasks;
    if (currentFilter === 'completed') {
      filtered = tasks.filter(t => t.completed);
    } else if (currentFilter === 'pending') {
      filtered = tasks.filter(t => !t.completed);
    }
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(t => t.text.toLowerCase().includes(searchQuery));
    }
    filtered.forEach((task, idx) => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';

      // Checkbox for completion
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.setAttribute('aria-label', `Mark ${task.text} as completed`);
      checkbox.addEventListener('change', () => {
        // Find the correct index in the original tasks array
        const realIdx = tasks.indexOf(task);
        if (realIdx !== -1) {
          tasks[realIdx].completed = checkbox.checked;
          saveTasks();
          renderTasks();
        }
      });

      // Task label
      const label = document.createElement('span');
      label.className = 'task-label';
      label.textContent = task.text;
      label.tabIndex = 0;
      label.setAttribute('aria-label', task.text);
      label.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });

      // Delete button
      const delBtn = document.createElement('button');
      delBtn.className = 'delete';
      delBtn.setAttribute('aria-label', `Delete ${task.text}`);
      delBtn.innerHTML = '&times;';
      delBtn.addEventListener('click', () => {
        // Find the correct index in the original tasks array
        const realIdx = tasks.indexOf(task);
        if (realIdx !== -1) {
          tasks.splice(realIdx, 1);
          saveTasks();
          renderTasks();
        }
      });

      const actions = document.createElement('div');
      actions.className = 'task-actions';
      actions.appendChild(delBtn);

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(actions);
      list.appendChild(li);
    });
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
