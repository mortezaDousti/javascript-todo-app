const input = document.querySelector('#taskInput');
const addTaskBtn = document.querySelector('#addBtn');
const list = document.querySelector('.taskList');
const allBtn = document.querySelector('#allBtn');
const activeBtn = document.querySelector('#activeBtn');
const completedBtn = document.querySelector('#completedBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editTaskId = null;
let currentFilter = 'all';
renderTasks();

//===== add task with button =====

addTaskBtn.addEventListener('click', addTask);

allBtn.addEventListener('click', () => {
  currentFilter = 'all';
  renderTasks();
});

activeBtn.addEventListener('click', () => {
  currentFilter = 'active';
  renderTasks();
});

completedBtn.addEventListener('click', () => {
  currentFilter = 'completed';
  renderTasks();
});

function addTask() {
  //===== when the input is empty or space =====

  if (input.value.trim() === '') {
    input.value = '';
    input.focus();
    return;
  }

  //===== when the input has a value =====

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

//===== add task with keydown =====

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

function renderTasks() {
  list.innerHTML = '';

  let filteredTasks = tasks;

  if (currentFilter === 'active') {
    filteredTasks = tasks.filter((task) => task.completed === false);
  }

  if (currentFilter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed === true);
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement('li');
    const taskContent = document.createElement('div');
    taskContent.classList.add('taskContent');

    if (task.completed) {
      const checkIcon = document.createElement('i');
      checkIcon.textContent = 'check';
      checkIcon.classList.add('material-symbols-outlined');

      taskContent.appendChild(checkIcon);
    }

    //===== Span for writing the tasks =====

    const span = document.createElement('span');
    span.textContent = task.title;
    if (task.completed) {
      span.classList.add('completed');
    }

    //===== Click as done task =====

    span.addEventListener('click', () => {
      task.completed = !task.completed;

      localStorage.setItem('tasks', JSON.stringify(tasks));

      renderTasks();
    });

    //===== Button del =====

    const deleteBtn = document.createElement('button');
    const delIcon = document.createElement('i');
    delIcon.textContent = 'delete';
    delIcon.classList.add('material-symbols-outlined');
    deleteBtn.appendChild(delIcon);
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      input.focus();
    });

    //===== edit button =====

    const editBtn = document.createElement('button');
    const editIcon = document.createElement('i');
    editIcon.textContent = 'edit';
    editIcon.classList.add('material-symbols-outlined');
    editBtn.appendChild(editIcon);

    editBtn.addEventListener('click', () => {
      if (editTaskId !== null && editTaskId !== task.id) {
        return;
      }
      editTaskId = task.id;

      li.innerHTML = '';
      const editInput = document.createElement('input');
      editInput.value = task.title;
      const saveBtn = document.createElement('button');
      const saveIcon = document.createElement('i');
      saveIcon.textContent = 'save';
      saveIcon.classList.add('material-symbols-outlined');

      const cancelBtn = document.createElement('button');
      const cancelIcon = document.createElement('i');
      cancelIcon.textContent = 'undo';
      cancelIcon.classList.add('material-symbols-outlined');

      //===== save then edit btn =====

      saveBtn.addEventListener('click', () => {
        const newTitle = editInput.value.trim();

        if (newTitle === '') {
          return;
        }
        task.title = newTitle;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        editTaskId = null;
        input.focus();
      });

      editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          saveBtn.click();
        }
      });

      //===== cancel then edit btn =====

      cancelBtn.addEventListener('click', () => {
        renderTasks();
        editTaskId = null;
        input.focus();
      });

      const div2 = document.createElement('div');

      saveBtn.appendChild(saveIcon);
      cancelBtn.appendChild(cancelIcon);
      div2.appendChild(saveBtn);
      div2.appendChild(cancelBtn);
      li.appendChild(editInput);
      li.appendChild(div2);

      editInput.focus();
    });

    //===== Create element =====
    taskContent.appendChild(span);
    li.appendChild(taskContent);
    const div1 = document.createElement('div');
    div1.appendChild(editBtn);
    div1.appendChild(deleteBtn);
    li.appendChild(div1);
    list.appendChild(li);
  });
}
