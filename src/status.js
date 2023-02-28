export function updateCompletedStatus(task, items) {
  const index = items.findIndex((item) => item.index === task.index);
  items[index].completed = !items[index].completed;
}

export function clearCompleted(items) {
  return items.filter((task) => !task.completed);
}
