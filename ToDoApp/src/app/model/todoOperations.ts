import { Todo } from "./todo";

export interface TodoOperations {
    addTodo(todo: Todo): void,
    updateTodo(id: number, todo: Partial<Todo>): void,
    deleteTodo(id: number): void,
    getTodos(): Todo[],
    deleteAllTodos(): void
}