import apiFetch from "./api-fetch.js";

export function getTasks() {
    return apiFetch("/tasks");
}

export function createTask(newtask = { name, email, number, relation }) {
    return apiFetch("/tasks", { body: newtask });
}

export function showTask(idtasks) {
    return apiFetch(`/tasks/${idtasks}`);
}

export function editTask(
    idtask,
    data = { name, email, number, relation }
) {
    return apiFetch(`/tasks/${idtask}`, {
        body: data,
        method: "PATCH",
    });
}

export function deleteTask(id) {
    return apiFetch(`/tasks/${id}`, { method: "DELETE" });
}
