/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// deleteTask.js
// eslint-disable-next-line import/named
import { addTask } from './Add.js';

export function deleteWork(items, index) {
  items.splice(index, 1);
  items.forEach((task, index) => {
    task.index = index;
  });
  localStorage.setItem('items', JSON.stringify(items));
  renderTasks();
}
