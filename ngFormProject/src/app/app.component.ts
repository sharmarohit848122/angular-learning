import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

// Enums for field names and states
export enum FieldNames {
  Name = 'name',
  Role = 'role'
}

export enum FieldState {
  Valid = 'valid',
  Invalid = 'invalid',
  Dirty = 'dirty',
  Touched = 'touched'
}

// ✅ Enum for validation error keys
export enum ValidationErrors {
  Required = 'required',
  MinLength = 'minlength',
  MaxLength = 'maxlength',
  Email = 'email',
  Pattern = 'pattern'
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngFormProject';

  form!: FormGroup;

  // ✅ Expose enums to template
  FieldNames = FieldNames;
  FieldState = FieldState;
  ValidationErrors = ValidationErrors;

  constructor() {
    this.prepareFormGroup();
  }

  // onSubmit(form: NgForm) {
  //   console.log(form.value)
  // }

  prepareFormGroup() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      role: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched(); // Show validation messages
    }
  }

  // Check multiple field states using enum
  checkFieldState(path: FieldNames, ...props: FieldState[]): boolean {
    const field = this.form.get(path);
    if (!field) return false;

    return props.every(prop => (field as any)[prop]);
  }

  // Check for specific validation errors using enum
  checkFieldError(path: FieldNames, ...errors: ValidationErrors[]): boolean {
    const field = this.form.get(path);
    if (!field || !field.errors) return false;

    return errors.some(error => field.errors?.[error]);
  }
}
