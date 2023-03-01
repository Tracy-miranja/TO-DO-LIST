function deleteTask(items, index) {
  items.splice(index, 1);
  items.forEach((task, index) => {
    task.index = index;
  });
}
export default deleteTask;
