function addTask(items, description) {
  const newTask = {
    description,
    completed: false,
    index: items.length,
  };
  items.push(newTask);
}

export default addTask;
