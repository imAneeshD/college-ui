import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Notification } from '../notification/notification'; // ✅ import notification

interface StudentForm {
  fullName: FormControl<string | null>;
  email: FormControl<string | null>;
  mobile: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
  address: FormControl<string | null>;
  course: FormControl<string | null>;
}

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Notification],
  templateUrl: './registration-form.html',
  styleUrls: ['./registration-form.scss'],
})
export class RegistrationForm {
  file: File | null = null;
  form: FormGroup<StudentForm>;
  submitted = false;

  // notification
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.form = this.fb.group<StudentForm>({
      fullName: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      mobile: this.fb.control('', {
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
        nonNullable: true,
      }),
      dateOfBirth: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      address: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      course: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  get f() {
    return this.form.controls;
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  public triggerNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const student = { ...this.form.getRawValue(), marksFile: this.file } as any;

    this.studentService.create(student).subscribe({
      next: (res) => {
        this.triggerNotification('Registration Successful!', 'success');
        this.form.reset();
        this.file = null;
        this.submitted = false;
      },
      error: (err) => {
        this.triggerNotification(
          'Error: ' + (err.error?.message || 'Something went wrong'),
          'error'
        );
      },
    });
  }
}
