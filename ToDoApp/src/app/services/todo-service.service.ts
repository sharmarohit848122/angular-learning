import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoOperations } from '../model/todoOperations';
import { Priority } from '../model/priority';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService implements TodoOperations {

  constructor() { }

  private todos: Todo[] = [
  {
    id: 101,
    title: 'Finish Angular To-Do App',
    description: 'Complete the UI and connect it with the service layer',
    completed: false,
    dueDate: new Date('2025-09-05'),
    priority: Priority.High,
    createdAt: new Date('2025-09-01T10:00:00'),
    updatedAt: new Date('2025-09-01T12:30:00')
  },
  {
    id: 102,
    title: 'Write Unit Tests',
    description: 'Add unit tests for the service and component logic',
    completed: false,
    dueDate: new Date('2025-09-07'),
    priority: Priority.Medium,
    createdAt: new Date('2025-09-01T11:00:00'),
    updatedAt: new Date('2025-09-01T11:45:00')
  },
  {
    id: 103,
    title: 'Update README',
    description: 'Include setup instructions and usage examples',
    completed: true,
    dueDate: new Date('2025-08-31'),
    priority: Priority.Low,
    createdAt: new Date('2025-08-28T09:30:00'),
    updatedAt: new Date('2025-08-31T08:00:00')
  },
  {
    id: 104,
    title: 'Deploy to Firebase',
    description: 'Configure Firebase hosting and deploy the app',
    completed: false,
    dueDate: new Date('2025-09-10'),
    priority: Priority.High,
    createdAt: new Date('2025-09-01T13:00:00'),
    updatedAt: new Date('2025-09-01T13:15:00')
  },
  {
    id: 105,
    title: 'Refactor Codebase',
    description: 'Improve code readability and remove unused imports',
    completed: false,
    dueDate: new Date('2025-09-08'),
    priority: Priority.Medium,
    createdAt: new Date('2025-09-01T14:00:00'),
    updatedAt: new Date('2025-09-01T14:30:00')
  }
];

  private count = 0;

  getTodos() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    todo.id = this.count++;
    this.todos.push(todo)
  }

  updateTodo(id: number, updatedTodo: Partial<Todo>) {
    const index = this.todos.findIndex(t => t.id === id)

    if (index != -1) {
      this.todos[index] = {
        ...this.todos[index], ...updatedTodo, updatedAt: new Date()
      }
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  deleteAllTodos(): void {
    this.todos = []
  }

}
