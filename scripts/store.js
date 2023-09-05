import { getTasks, } from "./services/tasks-services.js";

async function fetchTasks(){
  const tasks = await getTasks();
  STORE.tasks = tasks;
};
// function deleteTask() {
//   const taskIndex = STORE.tasks.findIndex(({ id }) => id == STORE.tasks.currentId);
//   STORE.tasks.splice(taskIndex, 1);
// };

const STORE = {
  user: null,
  tasks: [],
  fetchTasks,
  currentId: null,
  // deleteTask,
};
export default STORE;