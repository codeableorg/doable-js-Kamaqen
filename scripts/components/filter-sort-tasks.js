import Tasks from "./tasks.js";
// import DOMHandler from "/scripts/dom-handler.js";
import STORE from "/scripts/store.js";

function loadAndRenderTasks() {
  const tasksComponent = Tasks.toString(); // Render the "Tasks" component
  const taskListContainer = document.querySelector(".js-task-list");

  // Update the content of the task list container
  if (taskListContainer) {
    taskListContainer.innerHTML = tasksComponent;
  }
}

// Function to sort tasks by importance
function sortByImportance(taskA, taskB) {
  if (taskA.important && !taskB.important) {
    return -1;
  } else if (!taskA.important && taskB.important) {
    return 1;
  } else {
    return 0;
  }
}

// Function to sort tasks by due date
function sortByDueDate(taskA, taskB) {
  const dateA = taskA.due_date ? new Date(taskA.due_date) : null;
  const dateB = taskB.due_date ? new Date(taskB.due_date) : null;

  if (dateA === null && dateB === null) {
    return 0; // Both tasks have no due date, no change in order.
  } else if (dateA === null) {
    return 1; // Task A has no due date, it should come after task B.
  } else if (dateB === null) {
    return -1; // Task B has no due date, it should come after task A.
  } else {
    return dateA - dateB; // Compare due dates for other cases.
  }
}
// function renderTask(task) {
//   return `
// <li class="flex justify-between">
//   <div class="">
//     <input class="checkbox checkbox__input" type="checkbox">
//   </div>
//   <div class="flex flex-column">
//     <p class="" data-id=${task.id} >${task.title}</p>
//     <p class="" data-id="" >${task.due_date || ""}</p>
//   </div>
//   <div class="">
//     <img id=${task.id} class="" src="/assets/images/important-false.png" />
//   </div>
// </li>
// `;
// }

// function renderTasks() {
//   const onlyImportantCheckbox = document.getElementById("onlyImportant");
//   const onlyPendingCheckbox = document.getElementById("onlyPending");
//   const taskListContainer = document.querySelector(".js-task-list");

//   if (!taskListContainer) return;

//   let filteredTasks = [...STORE.tasks]; // Make a copy of your tasks

//   if (onlyImportantCheckbox.checked) {
//     // Filter tasks to show only important tasks
//     filteredTasks = filteredTasks.filter((task) => task.important === true);
//   }

//   if (onlyPendingCheckbox.checked) {
//     // Filter tasks to show only pending tasks (completed: false)
//     filteredTasks = filteredTasks.filter((task) => task.completed === false);
//   }

//   // Render the filtered tasks
//   taskListContainer.innerHTML = filteredTasks.map(renderTask).join("");
// }

// Event listener for the checkboxes
// function addCheckboxListeners() {
//   const onlyImportantCheckbox = document.getElementById("onlyImportant");
//   const onlyPendingCheckbox = document.getElementById("onlyPending");

//   if (onlyImportantCheckbox && onlyPendingCheckbox) {
//     onlyImportantCheckbox.addEventListener("change", renderTasks);
//     onlyPendingCheckbox.addEventListener("change", renderTasks);
//   }
// }

function listenerSortTasks() {
  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", function () {
    const selectedValue = sortSelect.value;

    if (selectedValue === "alphabetical") {
      // Sort tasks alphabetically by title
      STORE.tasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedValue === "importance") {
      // Sort tasks by importance
      STORE.tasks.sort(sortByImportance);
    } else if (selectedValue === "dueDate") {
      // Sort tasks by due date
      STORE.tasks.sort(sortByDueDate);
    }
    loadAndRenderTasks();
  });
}

function render() {
    return `
      <form class="flex flex-column gap-2">
          <div class="flex gap-4">
            <p>Sort</p>
            <select id="sortSelect" name="sort">
              <option value="alphabetical" selected>Alphabetical (a-z)</option>
              <option value="importance">Importance</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
          <div class="flex gap-2">
            <p>Show</p>
            <input class="checkbox checkbox__input" type="checkbox" id="onlyImportant" name="onlyImportant">
            <label for="onlyImportant">Only Important</label>
            <input class="checkbox checkbox__input" type="checkbox" id="onlyPending" name="onlyPending">
            <label for="onlyPending">Only Pending</label>
          </div>
      </form>
    `;
    
}

const sort_filter = {
    toString() {
        return render();
    },
    addListeners() {
      listenerSortTasks();
      // addCheckboxListeners();
    },
};
export default sort_filter;