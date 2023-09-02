// import { input } from "./input.js";
// import DOMHandler from "../dom-handler.js";
// import { createTask } from "../services/tasks-services.js";
// import STORE from "../store.js";

// function listenerAddTask() {
//     const form = document.querySelector(".js-new-task-form");
//     form.addEventListener("submit", async (event) => {
//         event.preventDefault();
//         const { title, due_date } = event.target;
//         const data = {
//             title: title.value,
//             duedate: due_date.value,
//         };
//         const task = await createTask(data);
//         STORE.tasks.push(task);
//         DOMHandler.reload();
//     });
// }

function render() {
    return `
      <form class="js-new-task-form">
          <div class="new-task-form">
            <label for="sortSelect">Sort:</label>
            <select id="sortSelect" name="sort">
              <option value="alphabetical">Alphabetical (a-z)</option>
              <option value="importance">Importance</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
      </form>
    `;
}

const sort_filter = {
    toString() {
        return render();
    },
    addListeners() {
    },
};
export default sort_filter;