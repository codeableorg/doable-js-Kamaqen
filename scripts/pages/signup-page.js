import { input } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import { login } from "../services/session-services.js";
import { signUp } from "../services/users-services.js";
import STORE from "../store.js";
import homePage from "./home-page.js";
import loginPage from "./login-page.js";

function render() {
    const { signupError } = signupPage.state;
    return `
  <main>
    <section class="container">
      <div class="header">
          <h3 class="header-title">Signup</h3>
      </div>
      <form class="js-signup-form">
        <div>
          ${input({
              id: "email",
              type: "email",
              placeholder: "email",
              required: true,
          })} 
          ${input({
              id: "password",
              type: "password",
              placeholder: "password",
              required: true,
          })}
        </div>
        ${
            signupError
                ? `<p class="text-center error-300">${signupError}</p>`
                : ""
        }
        <div class="footer js-links-pages">
          <a href="#" class="link js-login-link">Login</a>
          <button class="button-link">Create Account</button>
        </div>
      </form>
    </section>
  </main>
  `;
}
function listenersubmitSignup() {
    try {
        const form = document.querySelector(".js-signup-form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const { email, password } = event.target;
            const newUser = {
                email: email.value,
                password: password.value,
            };
            const user = await signUp(newUser);
            STORE.user = user;
            DOMHandler.load(homePage);
        });
    } catch (error) {
        signupPage.state.loginError = error.message;
        DOMHandler.reload();
    }
}

function listenerLogin() {
    const link = document.querySelector(".js-login-link");
    link.addEventListener("click", (event) => {
        event.preventDefault();
        DOMHandler.load(loginPage);
    });
}

const signupPage = {
    toString() {
        return render();
    },
    addListeners() {
        listenersubmitSignup();
        listenerLogin();
    },
    state: {
        signupError: null,
    },
};
export default signupPage;