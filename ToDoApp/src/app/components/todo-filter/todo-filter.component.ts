import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type FilterField = 'dueDate' | 'priority' | 'title' | 'completed';
export type SortOrder = 'asc' | 'desc';

export interface TodoFilter {
  field: FilterField;
  order: SortOrder;
}

@Component({
  selector: 'app-todo-filter',
  imports:[FormsModule],
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent {
  selectedField: FilterField = 'dueDate';
  selectedOrder: SortOrder = 'asc';

  @Output() filterChanged = new EventEmitter<TodoFilter>();

  onFieldChange() {
    // this.selectedField = field;
    this.emitFilter();
  }

  onOrderChange() {
    // this.selectedOrder = order;
    this.emitFilter();
  }

  private emitFilter() {
    this.filterChanged.emit({
      field: this.selectedField,
      order: this.selectedOrder
    });
  }
}