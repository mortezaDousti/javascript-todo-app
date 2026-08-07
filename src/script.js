const input = document.querySelector('#taskInput');
const button = document.querySelector('#addBtn');
const list = document.querySelector('.taskList');

button.addEventListener('click', addTask);

function addTask() {
  const taskText = input.value;

  console.log(taskText);
}
