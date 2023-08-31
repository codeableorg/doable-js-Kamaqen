import DOMHandler from "./scripts/dom-handler.js";
import loginPage from "./scripts/pages/login-page.js";
import { tokenKey } from "./scripts/config.js";
import homePage from "./scripts/pages/home-page.js";
import STORE from "./scripts/store.js";
import { login } from "./scripts/services/session-services.js";

// async function init() {
//     try {
//         const token = sessionStorage.getItem(tokenKey);

//         if (!token) return DOMHandler.load(loginPage);
//         STORE.fetchContacts();
//         DOMHandler.load(homePage);
//     } catch (error) {
//         console.log(error);
//         sessionStorage.removeItem(tokenKey);
//         DOMHandler.load(loginPage);
//     }
// }
// init();
DOMHandler.load(loginPage);