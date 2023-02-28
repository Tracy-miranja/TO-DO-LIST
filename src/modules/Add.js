
exports function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: items.length,
  };
  items.push(newTask);
  localStorage.setItem('items', JSON.stringify(items));
  renderTasks();
}