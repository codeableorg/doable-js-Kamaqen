import STORE from "../store.js";


function renderTask(task) {
    return `
  <li class="tasks-list">
    <div class="task-width1">
      <input type="checkbox">
    </div>
    <div class="task-width2">
      <a class="js-link-task" data-id=${task.id} href="#">${task.title}</a>
    </div>
    <div class="task-width3">
      <img id=${task.id} class="img-star" src="/assets/images/important-false.png" />
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