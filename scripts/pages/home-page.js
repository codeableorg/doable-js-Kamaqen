// import Contacts from "../components/contacts.js";
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
              <h2 class="header-home-title">Doable</h3>
              <a class="logout-link" href="#">Logout</a>
          </div>

          <div class="footer js-links-pages">
          <img class="add-link" src="../../assets/images/add.png" alt="" srcset="">
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