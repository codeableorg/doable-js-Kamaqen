import { editTask } from "../services/tasks-services.js";
import STORE from "../store.js";
import DOMHandler from "/scripts/dom-handler.js";

// Define CSS classes
const completedClass = "task-completed";
const notCompletedClass = "task-not-completed";

function renderTask(task) {
  const dueDate = task.due_date ? new Date(task.due_date) : "";
  let formattedDueDate = "";

  if (dueDate) {
    formattedDueDate = dueDate.toDateString();
  }

  // Determine the image source based on the 'important' property
  const imgSrc = `/assets/images/important-${task.important ? 'true' : 'false'}.png`;

  // Determine the task title class based on the 'completed' property
  const titleClass = task.completed ? completedClass : notCompletedClass;

  // Add the "completed-task" class if the task is completed
  const notPendingClass = task.completed ? "completed-task" : "";

  return `
    <li class="flex justify-between ${notPendingClass}">
      <div class="">
        <input class="checkbox checkbox__input js-checkbox-list" type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
      </div>
      <div class="flex flex-column">
        <p class="${titleClass} data-id="${task.id}">${task.title}</p>
        <p class="" data-id="">${formattedDueDate}</p>
      </div>
      <div class="">
        <img id="${task.id}" class="js-important-toggle" src=${imgSrc} />
      </div>
    </li>
  `;
}

function render() {
  const tasks = STORE.tasks;
    return `
    <ul class="js-task-list">
    ${tasks.map(renderTask).join("")}
    </ul>
    `;
}

// Add event listener to checkboxes
function addListListeners() {
  const checkboxes = document.querySelectorAll(".js-checkbox-list");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", async (event) => {
      const taskId = event.target.getAttribute("data-id");
      const task = STORE.tasks.find(task => task.id === parseInt(taskId));
      
      if (task) {
        task.completed = event.target.checked;

        // Update the task in the API
        try {
          await editTask(taskId, { completed: task.completed });
          console.log("Task updated in the API.");
        } catch (error) {
          console.error("Error updating task in the API:", error);
        }
        
        // Update the UI and render tasks
        DOMHandler.reload();
      }
    });
  });

  // Add event listener to image elements for toggling 'important' property
  const importantImages = document.querySelectorAll(".js-important-toggle");
  importantImages.forEach(img => {
    img.addEventListener("click", async (event) => {
      const taskId = event.target.id;
      const task = STORE.tasks.find(task => task.id === parseInt(taskId));
      
      if (task) {
        task.important = !task.important;

        // Update the task in the API
        try {
          await editTask(taskId, { important: task.important });
          console.log("Task 'important' property updated in the API.");
        } catch (error) {
          console.error("Error updating task 'important' property in the API:", error);
        }

        // Update the UI and render tasks
        DOMHandler.reload();
      }
    });
  });
}

const Tasks = {
    toString() {
        return render();
    },
    addListeners() {
      addListListeners();
    },
};
export default Tasks;
