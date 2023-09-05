import DOMHandler from "./scripts/dom-handler.js";
import loginPage from "./scripts/pages/login-page.js";
import { tokenKey } from "./scripts/config.js";
import homePage from "./scripts/pages/home-page.js";
import STORE from "./scripts/store.js";

async function init() {
    try {
        const token = sessionStorage.getItem(tokenKey);

        if (!token) return DOMHandler.load(loginPage);
        await STORE.fetchTasks();
        DOMHandler.load(homePage);
    } catch (error) {
        console.log(error);
        sessionStorage.removeItem(tokenKey);
        DOMHandler.load(loginPage);
    }
}
init();