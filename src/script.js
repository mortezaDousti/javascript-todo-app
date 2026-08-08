const input = document.querySelector('#taskInput');
const button = document.querySelector('#addBtn');
const list = document.querySelector('.taskList');

button.addEventListener('click', addTask);

function addTask() {
  if (input.value.trim() === '') {
    return;
  }
  const taskText = input.value;
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;
  span.addEventListener('click', () => span.classList.toggle('completed'));
  const btn = document.createElement('button');
  btn.textContent = 'Del';
  btn.addEventListener('click', () => li.remove());
  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
  input.value = '';
  input.focus();
}

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
