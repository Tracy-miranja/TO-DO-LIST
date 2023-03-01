// deleteTask.js
import { addTask } from "./Add.js";
export function deleteWork(items, index) {
    items.splice(index, 1);
    items.forEach((task, index) => {
      task.index = index;
    });
    localStorage.setItem('items', JSON.stringify(items));
    renderTasks();
  }
  