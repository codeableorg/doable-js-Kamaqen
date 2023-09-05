import { input } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import { login } from "../services/session-services.js";
import STORE from "../store.js";
import homePage from "./home-page.js";
import signupPage from "./signup-page.js";

function render() {
    const { loginError } = loginPage.state;
    return `
    <main>
        <section class="container">
        <div class="header">
            <h3 class="header-title">Login</h3>
        </div>
        <form class="js-login-form">
            <div>
            ${input({
                id: "email",
                type: "email",
                placeholder: "email",
                required: true,
                value: "Kamaqen@mail.com",
            })} 
            ${input({
                id: "password",
                type: "password",
                placeholder: "password",
                required: true,
                value: "supersecret",
            })}
            </div>
            ${
                loginError
                    ? `<p class="text-center error-300">${loginError}</p>`
                    : ""
            }
            <div class="footer js-links-pages">
            <a href="#" class="link js-signup-link">Signup</a>
            <button class="button-link">Login</button>
            </div>
        </form>
        </section>
    </main>
    `;
}

function listenerSubmitLogin() {
    try {
        const form = document.querySelector(".js-login-form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const { email, password } = event.target;
            const credentials = {
                email: email.value,
                password: password.value,
            };
            await login(credentials);
            await STORE.fetchTasks();
            DOMHandler.load(homePage);
        });
    } catch (error) {
        loginPage.state.loginError = error.message;
        DOMHandler.reload();
    }
}

function listenerSignup() {
    const link = document.querySelector(".js-signup-link");
    link.addEventListener("click", (event) => {
        event.preventDefault();
        DOMHandler.load(signupPage);
    });
}
const loginPage = {
    toString() {
        return render();
    },
    addListeners() {
        listenerSubmitLogin();
        listenerSignup();
    },
    state: {
        loginError: null,
    },
};
export default loginPage;