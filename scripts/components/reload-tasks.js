import Tasks from "./tasks.js";

export function loadAndRenderTasks() {
  const tasksComponent = Tasks.toString(); // Render the "Tasks" component
  const taskListContainer = document.querySelector(".js-task-list");

  // Update the content of the task list container
  if (taskListContainer) {
    taskListContainer.innerHTML = tasksComponent;
  }
}