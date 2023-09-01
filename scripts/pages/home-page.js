// import Contacts from "../components/contacts.js";
import Tasks from "../components/tasks.js";
import DOMHandler from "../dom-handler.js";
import { logout } from "../services/session-services.js";
import loginPage from "./login-page.js";
// import newContact from "./new-page.js";

function listenerLogout() {
    const link = document.querySelector(".logout-link");
    link.addEventListener("click", async (event) => {
        event.preventDefault();
        await logout();
        DOMHandler.load(loginPage);
    });
};

// function listenerAddContact() {
//     const add = document.querySelector(".add-link");
//     add.addEventListener("click", (event) => {
//         event.preventDefault();
//         DOMHandler.load(newContact);
//     });
// };

function render() {
    return `
      <main>
        <section class="container">
          <div class="header-home">
            <img class="add-link" src="/assets/images/{ doable }.png" alt="doable logo" srcset="">
            <img class="logout-link" src="/assets/images/logout-icon.svg" alt="logout icon" srcset="">
          </div>
          ${Tasks}
          <div class="footer js-links-pages">
          </div>
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
        // listenerAddContact();
        // Contacts.addListeners();
    },
};
export default homePage;