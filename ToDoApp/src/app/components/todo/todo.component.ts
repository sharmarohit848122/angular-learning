import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../../services/todo-service.service';
import { Todo } from '../../model/todo';
import { TodoOperations } from '../../model/todoOperations';
import { TodoCardViewComponent } from "../todo-card-view/todo-card-view.component";
import { TodoInputDialogComponent } from "../todo-input-dialog/todo-input-dialog.component";
import { TodoFilterComponent, TodoFilter } from "../todo-filter/todo-filter.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [
    TodoCardViewComponent,
    TodoInputDialogComponent,
    TodoFilterComponent,
    NgIf
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements TodoOperations, OnInit {
  constructor(private todoService: TodoServiceService) { }

  showInputDialog: boolean = false;
  dialogMode: 'edit' | 'add' = 'add';
  selectedTodo: Todo | null = null;

  todos: Todo[] = [];
  filteredTodos: Todo[] = [];

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
    this.filteredTodos = [...this.todos];
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
    this.todos = this.todoService.getTodos();
    this.filteredTodos = [...this.todos];
  }

  updateTodo(id: number, updatedTodo: Partial<Todo>) {
    this.todoService.updateTodo(id, updatedTodo);
    this.todos = this.todoService.getTodos();
    this.filteredTodos = [...this.todos];
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
    this.filteredTodos = [...this.todos];
  }

  deleteAllTodos(): void {
    this.todoService.deleteAllTodos();
    this.todos = [];
    this.filteredTodos = [];
  }

  onMarkAsCompleted(id: number) {
    this.updateTodo(id, { completed: true });
  }

  onDelete(id: number) {
    this.deleteTodo(id);
  }

  onEdit(todo: Todo) {
    this.openEditDialog(todo);
  }

  onDetailView(id: number) { }

  openAddDialog() {
    this.dialogMode = 'add';
    this.selectedTodo = null;
    this.showInputDialog = true;
  }

  openEditDialog(todo: Todo) {
    this.dialogMode = 'edit';
    this.selectedTodo = todo;
    this.showInputDialog = true;
  }

  onSave(todo: Todo) {
    this.addTodo(todo);
    this.showInputDialog = false;
  }

  onUpdate(todo: Todo) {
    this.updateTodo(todo.id, todo);
    this.showInputDialog = false;
  }

  onCancel() {
    this.showInputDialog = false;
  }

  applyFilter(filter: TodoFilter) {
    const { field, order } = filter;

    this.filteredTodos = [...this.todos].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        return order === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if (valA instanceof Date && valB instanceof Date) {
        return order === 'asc' ? valA.getTime() - valB.getTime() : valB.getTime() - valA.getTime();
      }

      return 0; // fallback
    });
  }
}