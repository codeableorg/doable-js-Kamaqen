import sort_filter from "../components/filter-sort-tasks.js";
import newTask from "../components/new-task.js";
import Tasks from "../components/tasks.js";
import DOMHandler from "../dom-handler.js";
import { logout } from "../services/session-services.js";
import loginPage from "./login-page.js";

function listenerLogout() {
    const link = document.querySelector(".logout-link");
    link.addEventListener("click", async (event) => {
        event.preventDefault();
        await logout();
        DOMHandler.load(loginPage);
    });
};

function render() {
    return `
      <main>
        <section class="container">
          <div class="header flex items-center">
            <img class="add-link" src="/assets/images/{ doable }.png" alt="doable logo" srcset="">
            <img class="logout-link" src="/assets/images/logout-icon.svg" alt="logout icon" srcset="">
          </div>
          ${sort_filter}
          ${Tasks}
          ${newTask}
        </section>
        
      </main>
    `;
}
const homePage = {
    toString() {
        return render();
    },
    addListeners() {
        listenerLogout();
        newTask.addListeners();
        sort_filter.addListeners();
    },
};
export default homePage;