import { editTask } from "../services/tasks-services.js";
import STORE from "../store.js";

function renderTask(task) {
  const dueDate = task.due_date ? new Date(task.due_date) : "";
  let formattedDueDate = "";

  if (dueDate) {
    formattedDueDate = dueDate.toDateString();
  }
  return `
    <li class="flex justify-between">
      <div class="">
        <input class="checkbox checkbox__input js-checkbox-list" type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
      </div>
      <div class="flex flex-column">
        <p class="" data-id="${task.id}">${task.title}</p>
        <p class="" data-id="">${formattedDueDate}</p>
      </div>
      <div class="">
        <img id="${task.id}" class="" src="/assets/images/important-false.png" />
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
function addCheckboxListeners() {
  const checkboxes = document.querySelectorAll(".js-checkbox-list");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", async (event) => {
      const taskId = event.target.getAttribute("data-id");
      const task = STORE.tasks.find(task => task.id === parseInt(taskId));
      console.log(task);
      
      if (task) {
        task.completed = event.target.checked;

        // Update the task in the API
        try {
          await editTask(taskId, { completed: task.completed });
          console.log("Task updated in the API.");
        } catch (error) {
          console.error("Error updating task in the API:", error);
        }
      }
    });
  });
}


const Tasks = {
    toString() {
        return render();
    },
    addListeners() {
      addCheckboxListeners();
    },
};
export default Tasks;