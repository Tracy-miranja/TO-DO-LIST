/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  const sortedTasks = tasks.sort((a, b) => a.index - b.index);
  sortedTasks.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks();
    });
    const label = document.createElement('label');
    label.innerText = task.description;
    label.style.textDecoration = task.completed ? 'line-through' : 'none';
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    taskList.appendChild(listItem);
  });
}

function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  // eslint-disable-next-line no-return-assign
  tasks.forEach((task, i) => (task.index = i));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('item');
  const description = input.value.trim();
  if (description !== '') {
    addTask(description);
    input.value = '';
  }
});

renderTasks();
