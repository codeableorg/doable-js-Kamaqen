import STORE from "../store.js";


function renderTask(task) {
    return `
  <li class="form-fields flex justify-between tasks-list">
    <div class="">
      <input class="checkbox checkbox__input" type="checkbox">
    </div>
    <div class="flex flex-column">
      <p class="js-link-task" data-id=${task.id} >${task.title}</p>
      <p class="js-link-task" data-id="" >${task.due_date || ""}</p>
    </div>
    <div class="">
      <img id=${task.id} class="" src="/assets/images/important-false.png" />
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
const Tasks = {
    toString() {
        return render();
    },
    addListeners() {
    },
};
export default Tasks;