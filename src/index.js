/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';

import { updateCompletedStatus, clearCompleted } from './modules/status.js';
// eslint-disable-next-line no-unused-vars
import { Task } from './modules/add.js';

const taskList = document.getElementById('task-list');
const form = document.querySelector('form');

let items = JSON.parse(localStorage.getItem('items')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  items.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      updateCompletedStatus(task, items);
      localStorage.setItem('items', JSON.stringify(items));
      renderTasks();
    });

    const labelWrapper = document.createElement('div');
    labelWrapper.classList.add('label-wrapper');

    const label = document.createElement('label');
    label.innerText = task.description;
    label.style.textDecoration = task.completed ? 'line-through' : 'none';
    label.addEventListener('dblclick', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = task.description;
      input.classList.add('edit-input');
      input.addEventListener('blur', () => {
        task.description = input.value;
        localStorage.setItem('items', JSON.stringify(items));
        renderTasks();
      });
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          task.description = input.value;
          localStorage.setItem('items', JSON.stringify(items));
          renderTasks();
        }
      });
      label.replaceWith(input);
      input.focus();
    });

    const dotsIcon = document.createElement('i');
    dotsIcon.classList.add('fas', 'fa-ellipsis-v', 'dots-icon');
    dotsIcon.addEventListener('click', () => {
      deleteIcon.style.display = 'block';
      dotsIcon.style.display = 'none';
    });

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash', 'delete-icon');
    deleteIcon.addEventListener('click', () => {
      deleteTask(task.index);
    });
    labelWrapper.appendChild(checkbox);
    labelWrapper.appendChild(label);
    labelWrapper.appendChild(dotsIcon);
    labelWrapper.appendChild(deleteIcon);

    listItem.appendChild(labelWrapper);
    taskList.appendChild(listItem);
  });
}

function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: items.length,
  };
  items.push(newTask);
  localStorage.setItem('items', JSON.stringify(items));
  renderTasks();
}

function deleteTask(index) {
  items.splice(index, 1);
  items.forEach((task, index) => {
    task.index = index;
  });
  localStorage.setItem('items', JSON.stringify(items));
  renderTasks();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('item');
  const description = input.value;
  addTask(description);
  input.value = '';
});

const clearButton = document.getElementById('submit');
clearButton.addEventListener('click', () => {
  items = clearCompleted(items);
  localStorage.setItem('items', JSON.stringify(items));
  renderTasks();
});

const plusIcon = document.querySelector('.input-icon i');
plusIcon.addEventListener('click', () => {
  const input = document.getElementById('item');
  const description = input.value;
  addTask(description);
  input.value = '';
});

renderTasks();