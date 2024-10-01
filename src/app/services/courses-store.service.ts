import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CoursesService } from './courses.service';

import Course from '@app/core/interfaces/course';
import Author from '@app/core/interfaces/author';
import CourseForm from '@app/core/interfaces/course-form';

@Injectable({
    providedIn: 'root',
})
export class CoursesStoreService {
    private courses$$ = new BehaviorSubject<{
        successful: boolean;
        result: Course[] | Course | Author[] | Author;
    }>({ successful: false, result: [] });
    private isLoading$$ = new BehaviorSubject<boolean>(false);

    public courses$: Observable<{
        successful: boolean;
        result: Course[] | Course | Author[] | Author;
    }> = this.courses$$.asObservable();
    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

    constructor(private coursesService: CoursesService) {}

    getAll() {
        this.isLoading$$.next(true);
        this.coursesService.getAll().subscribe({
            next: (courses) => {
                this.courses$$.next(courses);
                this.isLoading$$.next(false);
            },
            error: (error) => {
                throw new Error(error);
            },
        });
    }

    createCourse(course: CourseForm) {
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course).subscribe({
            next: (course) => {
                this.courses$$.next(course);
                this.isLoading$$.next(false);
            },
            error: (error) => {
                throw new Error(error);
            },
        });
    }

    getCourse(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.getCourse(id).subscribe({
            next: (course) => {
                this.courses$$.next(course);
                this.isLoading$$.next(false);
            },
            error: (error) => {
                throw new Error(error);
            },
        });
    }

    editCourse(id: string, course: any) {
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course).subscribe({
            next: (course) => {
                this.courses$$.next(course);
                this.isLoading$$.next(false);
            },
            error: (error) => {
                throw new Error(error);
            },
        });
    }

    deleteCourse(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id).subscribe({
            next: () => {
                this.isLoading$$.next(false);
            },
            error: (error) => {
                throw new Error(error);
            },
        });
    }

    filterCourses(value: string) {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value).subscribe({
            next: (course) => {
                this.courses$$.next(course);
                this.isLoading$$.next(false);
            },
            error: (error) => {
                throw new Error(error);
            },
        });
    }

    getAllAuthors() {
        this.isLoading$$.next(true);
        this.coursesService.getAllAuthors().subscribe({
            next: (authors) => {
                this.courses$$.next(authors);
                this.isLoading$$.next(false);
            },
            error: (error) => {
                throw new Error(error);
            },
        });
    }

    createAuthor(name: string): Observable<Author> {
        this.isLoading$$.next(true);

        return new Observable<Author>((observer) => {
            this.coursesService.createAuthor(name).subscribe({
                next: (course) => {
                    if (course.successful) {
                        this.courses$$.next(course);
                        observer.next(course.result);
                        observer.complete();
                    } else {
                        observer.error('Failed to create author');
                    }

                    this.isLoading$$.next(false);
                },
                error: (error) => {
                    this.isLoading$$.next(false);
                    observer.error(error); // Emit the error if there is one
                },
            });
        });
    }

    getAuthorById(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.getAuthorById(id).subscribe({
            next: (author) => {
                this.courses$$.next(author);
                this.isLoading$$.next(false);
            },
            error: (error) => {
                throw new Error(error);
            },
        });
    }
}
