import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';
import { Observable } from 'rxjs';
import { StudentCreate } from '../models/student-create.model';
import { Student } from '../models/student.model';
import { StudentDetail } from '../models/student-detail.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
    private apiUrl = `${config.apiUrl}/registration`;

    constructor(private http: HttpClient) { }

    create(student: StudentCreate): Observable<StudentDetail> {
        const formData = new FormData();
        formData.append('FullName', student.fullName);
        formData.append('Email', student.email);
        formData.append('Mobile', student.mobile);
        formData.append('DateOfBirth', student.dateOfBirth);
        formData.append('Address', student.address);
        formData.append('Course', student.course);
        if (student.marksFile) {
            formData.append('MarksFile', student.marksFile);
        }
        return this.http.post<StudentDetail>(this.apiUrl, formData);
    }

    getPaged(page: number, pageSize: number = 10) {
        return this.http.get<any>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
    }

    getById(id: number): Observable<StudentDetail> {
        return this.http.get<StudentDetail>(`${this.apiUrl}/${id}`);
    }

    getCourseSummary(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/course-summary`);
    }
}
