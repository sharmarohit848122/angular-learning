import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../model/todo';
import { Priority } from '../../model/priority';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input-dialog',
  imports: [FormsModule],
  templateUrl: './todo-input-dialog.component.html',
  styleUrls: ['./todo-input-dialog.component.css']
})
export class TodoInputDialogComponent implements OnInit {

  @Input() todo: Todo | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  @Output() save = new EventEmitter<Todo>();
  @Output() update = new EventEmitter<Todo>();
  @Output() cancel = new EventEmitter<void>();

  formData: Partial<Todo> = {
    title: '',
    description: '',
    priority: Priority.Medium
  };

  Priority = Priority; // expose enum to template

  ngOnInit(): void {
    if (this.mode === 'edit' && this.todo) {
      this.formData = { ...this.todo };
    }
  }

  onSubmit() {
    const now = new Date();

    if (!this.formData.title || this.formData.title.trim() === '') {
      // Optionally show an error or prevent submission
      alert('Title is required');
      return;
    }

    const result: Todo = {
      ...(this.todo ?? {
        id: Date.now(),
        createdAt: now,
        completed: false
      }),
      title: this.formData.title, // explicitly required
      description: this.formData.description ?? '',
      priority: this.formData.priority ?? Priority.Medium,
      dueDate: this.formData.dueDate,
      updatedAt: now
    };

    if (this.mode === 'add') {
      this.save.emit(result);
    } else {
      this.update.emit(result);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}