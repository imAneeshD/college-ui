import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { CommonModule, DatePipe } from '@angular/common';
import { config } from '../../../config/config';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule, DatePipe],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.scss'
})
export class StudentDetail {
  
  getFileUrl(filePath: string): string {
    const baseUrl = config.apiUrl.replace(/\/api$/, '');
    return `${baseUrl}/${filePath}`;
  }


  student: any;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getById(id).subscribe(res => this.student = res);
  }
  goBack() {
    this.router.navigate(['/students']); 
  }

  print() {
    window.print();
  }
}
