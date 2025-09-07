import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../model/todo';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-card-view',
  imports: [DatePipe, NgIf],
  templateUrl: './todo-card-view.component.html',
  styleUrl: './todo-card-view.component.css'
})
export class TodoCardViewComponent {

  @Input({ required: true }) todo!: Todo;

  @Output() markAsCompleted = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Todo>();

  showDetails = false;

  onCardClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Check if the click was on one of the action icons
    const isActionIcon = target.closest('.todo-actions img');
    if (!isActionIcon) {
      this.showDetails = true;
    }
  }

  closeDetails() {
    this.showDetails = false;
  }

  onMarkAsCompleted() {
    this.markAsCompleted.emit(this.todo.id);
  }

  onEdit() {
    this.edit.emit(this.todo);
  }

  onDelte() {
    this.delete.emit(this.todo.id);
  }

}
