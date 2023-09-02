import { input } from "./input.js";
import DOMHandler from "../dom-handler.js";
import { createTask } from "../services/tasks-services.js";
import STORE from "../store.js";

function listenerAddTask() {
    const form = document.querySelector(".js-new-task-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { title, due_date } = event.target;
        const data = {
            title: title.value,
            due_date: due_date.value,
        };
        const task = await createTask(data);
        STORE.tasks.push(task);
        DOMHandler.reload();
    });
}

function render() {
    return `
    
        <form class="js-new-task-form">
            <div class="new-task-form">
            ${input({
                id: "title",
                type: "text",
                placeholder: "Title",
                required: true,
            })} 
            ${input({
                id: "due_date",
                type: "date",
                placeholder: "mm / dd / yy",
                required: false,
            })}
            </div>
            <div class="">
                <button class="button button--primary full-width">Add Task</button>
            </div>
        </form>
    `;
}

const newTask = {
    toString() {
        return render();
    },
    addListeners() {
        listenerAddTask();
    },
};
export default newTask;