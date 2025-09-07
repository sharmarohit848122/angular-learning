import { Priority } from "./priority";

export interface Todo {
    id: number,
    title: string,
    description?: string,
    completed: boolean,
    dueDate?: Date,
    priority?: Priority,
    createdAt: Date,
    updatedAt?: Date
}

