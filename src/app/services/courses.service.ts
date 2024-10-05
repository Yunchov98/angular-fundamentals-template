import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import Course from '@app/core/interfaces/course';
import { CoursesGeneric } from '@app/core/interfaces/coursesGeneric';

import Author from '@app/core/interfaces/author';
import CourseForm from '@app/core/interfaces/course-form';

import { CONSTANTS } from '@app/core/environments/constants';
import { ENDPOINTS } from '@app/core/environments/endpoints';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private apiUrl = CONSTANTS.host;

    constructor(private http: HttpClient) {}

    getAll(): Observable<CoursesGeneric<Course[]>> {
        return this.http.get<CoursesGeneric<Course[]>>(
            this.apiUrl + ENDPOINTS.courses
        );
    }

    createCourse(course: CourseForm): Observable<CoursesGeneric<Course>> {
        return this.http.post<CoursesGeneric<Course>>(
            this.apiUrl + ENDPOINTS.addCourse,
            course
        );
    }

    editCourse(id: string, course: Course): Observable<CoursesGeneric<Course>> {
        return this.http.put<CoursesGeneric<Course>>(
            this.apiUrl + ENDPOINTS.singleCourse(id),
            course
        );
    }

    getCourse(id: string): Observable<CoursesGeneric<Course>> {
        return this.http.get<CoursesGeneric<Course>>(
            this.apiUrl + ENDPOINTS.singleCourse(id)
        );
    }

    deleteCourse(id: string): Observable<unknown> {
        return this.http.delete<unknown>(
            this.apiUrl + ENDPOINTS.singleCourse(id)
        );
    }

    filterCourses(value: string): Observable<CoursesGeneric<Course[]>> {
        const params = new HttpParams().set('title', value);

        return this.http.get<CoursesGeneric<Course[]>>(
            this.apiUrl + ENDPOINTS.filteredCourses,
            {
                params,
            }
        );
    }

    getAllAuthors(): Observable<CoursesGeneric<Author[]>> {
        return this.http.get<CoursesGeneric<Author[]>>(
            this.apiUrl + ENDPOINTS.authors
        );
    }

    createAuthor(name: string): Observable<CoursesGeneric<Author>> {
        return this.http.post<CoursesGeneric<Author>>(
            this.apiUrl + ENDPOINTS.createAuthor,
            { name }
        );
    }

    getAuthorById(id: string): Observable<CoursesGeneric<Author>> {
        return this.http.get<CoursesGeneric<Author>>(
            this.apiUrl + ENDPOINTS.singleAuthor(id)
        );
    }
}
