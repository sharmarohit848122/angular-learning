import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInputDialogComponent } from './todo-input-dialog.component';

describe('TodoInputDialogComponent', () => {
  let component: TodoInputDialogComponent;
  let fixture: ComponentFixture<TodoInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInputDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
