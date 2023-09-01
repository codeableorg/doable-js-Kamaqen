import apiFetch from "./api-fetch.js";

export function getTasks() {
    return apiFetch("/tasks");
}

export function createTask(newtask = { title, due_date, important, completed  }) {
    return apiFetch("/tasks", { body: newtask });
}

export function showTask(idtasks) {
    return apiFetch(`/tasks/${idtasks}`);
}

export function editTask(
    idtask,
    data = { title, due_date, important, completed }
) {
    return apiFetch(`/tasks/${idtask}`, {
        body: data,
        method: "PATCH",
    });
}

export function deleteTask(id) {
    return apiFetch(`/tasks/${id}`, { method: "DELETE" });
}
