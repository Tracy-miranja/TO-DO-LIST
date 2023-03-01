function markAsComplete(task) {
  task.completed = true;
}

function markAsIncomplete(task) {
  task.completed = false;
}

export { markAsComplete, markAsIncomplete };
