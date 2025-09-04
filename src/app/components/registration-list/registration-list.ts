import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './registration-list.html',
  styleUrl: './registration-list.scss'
})
export class RegistrationList {
  students: any[] = [];
  page = 1;
  totalPages = 1;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getPaged(this.page).subscribe(res => {
      this.students = res.items;
      this.totalPages = res.totalPages;
    });
  }

  next() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadStudents();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.loadStudents();
    }
  }

  view(id: number) {
    this.router.navigate(['/student', id]);
  }
}

