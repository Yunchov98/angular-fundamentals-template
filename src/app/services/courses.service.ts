import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import Course from '@app/core/interfaces/course.interface';

import { CONSTANTS } from '@app/core/environments/constants';
import { ENDPOINTS } from '@app/core/environments/endpoints';
import Author from '@app/core/interfaces/author.interface';
import CourseForm from '@app/core/interfaces/course-form.interface';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private apiUrl = CONSTANTS.host;

    constructor(private http: HttpClient) {}

    getAll(): Observable<{ successful: boolean; result: Course[] }> {
        return this.http.get<{ successful: boolean; result: Course[] }>(
            this.apiUrl + ENDPOINTS.courses
        );
    }

    createCourse(
        course: CourseForm
    ): Observable<{ successful: boolean; result: Course }> {
        return this.http.post<{ successful: boolean; result: Course }>(
            this.apiUrl + ENDPOINTS.addCourse,
            course
        );
    }

    editCourse(
        id: string,
        course: Course
    ): Observable<{ successful: boolean; result: Course }> {
        return this.http.put<{ successful: boolean; result: Course }>(
            this.apiUrl + ENDPOINTS.singleCourse(id),
            course
        );
    }

    getCourse(id: string): Observable<{ successful: boolean; result: Course }> {
        return this.http.get<{ successful: boolean; result: Course }>(
            this.apiUrl + ENDPOINTS.singleCourse(id)
        );
    }

    deleteCourse(id: string): Observable<unknown> {
        return this.http.delete<unknown>(
            this.apiUrl + ENDPOINTS.singleCourse(id)
        );
    }

    filterCourses(
        value: string
    ): Observable<{ successful: boolean; result: Course[] }> {
        const params = new HttpParams().set('title', value);

        return this.http.get<{ successful: boolean; result: Course[] }>(
            this.apiUrl + ENDPOINTS.filteredCourses,
            {
                params,
            }
        );
    }

    getAllAuthors(): Observable<{ successful: boolean; result: Author[] }> {
        return this.http.get<{ successful: boolean; result: Author[] }>(
            this.apiUrl + ENDPOINTS.authors
        );
    }

    createAuthor(
        name: string
    ): Observable<{ successful: boolean; result: Author }> {
        return this.http.post<{ successful: boolean; result: Author }>(
            this.apiUrl + ENDPOINTS.createAuthor,
            { name }
        );
    }

    getAuthorById(
        id: string
    ): Observable<{ successful: boolean; result: Author }> {
        return this.http.get<{ successful: boolean; result: Author }>(
            this.apiUrl + ENDPOINTS.singleAuthor(id)
        );
    }
}
