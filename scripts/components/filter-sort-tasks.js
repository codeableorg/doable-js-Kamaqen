import { loadAndRenderTasks } from "./reload-tasks.js";
import STORE from "/scripts/store.js";

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

function toggleCompletedTasks() {
  const tasks = document.querySelectorAll(".js-checkbox-list");

  tasks.forEach((task) => {
    const taskId = task.getAttribute("data-id");
    const taskData = STORE.tasks.find((task) => task.id === parseInt(taskId));

    if (taskData) {
      const onlyPending = document.getElementById("onlyPending");
      if (onlyPending && onlyPending.checked) {
        // Check if the task is completed and toggle visibility accordingly
        if (taskData.completed) {
          task.parentNode.parentNode.style.display = "none";
        } else {
          task.parentNode.parentNode.style.display = "flex";
        }
      } else {
        // Show all tasks when "Only Pending" checkbox is not checked
        task.parentNode.parentNode.style.display = "flex";
      }
    }
  });
}

function addPendingListener() {
  // Add an event listener to a checkbox with id "onlyPending"
  const onlyPending = document.getElementById("onlyPending");
  console.log(onlyPending);
  if (onlyPending) {
    onlyPending.addEventListener("click", toggleCompletedTasks);
  }
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
      addPendingListener();
    },
};
export default sort_filter;