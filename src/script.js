const input = document.querySelector('#taskInput');
const addTaskBtn = document.querySelector('#addBtn');
const list = document.querySelector('.taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//===== add task with button =====

addTaskBtn.addEventListener('click', addTask);

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
  tasks.forEach((task) => {
    const li = document.createElement('li');

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
    deleteBtn.textContent = 'Del';
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      input.focus();
    });

    //===== edit button =====

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    editBtn.addEventListener('click', () => {
      li.innerHTML = '';
      const editInput = document.createElement('input');
      editInput.value = task.title;
      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';

      saveBtn.addEventListener('click', () => {
        const newTitle = editInput.value.trim();

        if (newTitle === '') {
          return;
        }
        task.title = newTitle;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        input.focus();
      });

      editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          saveBtn.click();
        }
      });

      cancelBtn.addEventListener('click', () => {
        renderTasks();
        input.focus();
      });

      li.appendChild(editInput);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);
      editInput.focus();
    });

    //===== Create element =====

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}
renderTasks();
