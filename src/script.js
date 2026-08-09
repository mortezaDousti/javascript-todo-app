const input = document.querySelector('#taskInput');
const button = document.querySelector('#addBtn');
const list = document.querySelector('.taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
button.addEventListener('click', addTask);

function addTask() {
  if (input.value.trim() === '') {
    return;
  }
  const taskText = input.value.trim();
  const newTask = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  input.value = '';
  input.focus();
}

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');

    //===== Span for writing the tasks =====

    const span = document.createElement('span');
    span.textContent = task.title;
    if (task.completed) {
      span.classList.add('completed');
    }
    span.addEventListener('click', () => {
      task.completed = !task.completed;
      if (task.completed) {
        span.classList.add('completed');
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));

      renderTasks();
    });
    //===== Button del =====

    const btn = document.createElement('button');
    btn.textContent = 'Del';
    btn.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });

    //===== Create element =====

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}
renderTasks();
