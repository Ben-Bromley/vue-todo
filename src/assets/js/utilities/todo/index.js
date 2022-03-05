import db from "./db";

export default class ToDoApp {
    constructor() {
        this.id = 0;
    }
    async addTask(thisTodo, todos) {
        // add task to array
        if (thisTodo.value) {
            let newTodo = { id: this.id++, text: thisTodo.value, done: false };
            todos.value.push(newTodo);
            thisTodo.value = "";

            // add task to Dexie
            const saveTodo = await db.tasks.add({
                taskId: newTodo.id,
                text: newTodo.text,
                done: newTodo.done,
            });
        }
    }
    async completeTask(todo) {
        todo.done = !todo.done;
        const complete = await db.tasks
            .where("taskId")
            .equals(todo.id)
            .modify({ done: todo.done });
    }
    async removeTask(todo, todos) {
        todos.value = todos.value.filter((t) => t.id != todo.id);
        const removeTodo = await db.tasks.where("taskId").equals(todo.id).delete();
    }
    async retrieveTasks(todos) {
        // get stored tasks
        let tasks = await db.tasks.toArray();

        // if there's stored tasks, add them to reactive todos ref
        if (tasks.length) {
            todos.value = [];
            tasks.forEach((task) => {
                todos.value.push({ id: task.taskId, text: task.text, done: task.done });
            });
        } else {
            // if no stored todos, add sample todos and store them
            todos.value = [
                { id: this.id++, text: "Take out the trash", done: false },
                { id: this.id++, text: "Do the dishes", done: false },
            ];
            todos.value.forEach(async (todo) => {
                // add task to Dexie
                const saveInitial = await db.tasks.add({
                    taskId: todo.id,
                    text: todo.text,
                    done: todo.done,
                });
            });
        }
    }
}