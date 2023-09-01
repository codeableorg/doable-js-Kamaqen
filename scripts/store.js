import { getTasks, } from "./services/tasks-services.js";

async function fetchTasks(){
  const tasks = await getTasks();
  STORE.tasks = tasks;
  console.log(STORE.tasks);
};
// function deleteTask() {
//   const taskIndex = STORE.tasks.findIndex(({ id }) => id == STORE.tasks.currentId);
//   STORE.tasks.splice(taskIndex, 1);
// };
// function favoriteTask(starId) {
//   const favoriteIndex = STORE.tasks.findIndex(({ id }) => id == starId);
//   console.log(favoriteIndex);
//   const foundFav = STORE.tasks[favoriteIndex];
//   console.log(foundFav);
//   if (STORE.favorites.includes(foundFav)) return;
//   STORE.favorites.push(foundFav);
//   console.log(STORE.favorites);
// }

const STORE = {
  user: null,
  tasks: [],
  fetchTasks,
  currentId: null,
  // deleteTask,
};
export default STORE;