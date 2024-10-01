import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import Course from '@app/core/interfaces/course';
import Author from '@app/core/interfaces/author';

import { CoursesService } from '@app/services/courses.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit, OnDestroy {
    errorMessage!: string;
    isShowButtonClicked!: boolean;
    selectedCourse!: Course;
    coursesSubscribe$!: Subscription;
    authorsSubscribe$!: Subscription;
    searchSubscribe$!: Subscription;
    courses: Course[] = [];
    filteredCourses: Course[] = [];
    authors: Author[] = [];

    constructor(private coursesService: CoursesService) {}

    ngOnInit(): void {
        this.coursesSubscribe$ = this.coursesService.getAll().subscribe({
            next: (response) => {
                if (response.successful) {
                    this.courses = response.result;
                }
            },
            error: (error) => (this.errorMessage = error.error.message),
        });
    }

    ngOnDestroy(): void {
        if (this.coursesSubscribe$ !== undefined) {
            this.coursesSubscribe$.unsubscribe();
        }

        if (this.authorsSubscribe$ !== undefined) {
            this.authorsSubscribe$.unsubscribe();
        }

        if (this.searchSubscribe$ !== undefined) {
            this.searchSubscribe$.unsubscribe();
        }
    }

    getauthorName(authorIds: string[]): string[] {
        return authorIds.map((id) => {
            const author = this.authors.find((a) => a.id === id);

            return author ? author.name : 'Unknown author';
        });
    }

    onShowCourse(course: Course) {
        this.selectedCourse = course;
        this.isShowButtonClicked = true;
        this;
    }

    onBack() {
        this.isShowButtonClicked = false;
    }

    onSearch(searchTerm: string): void {
        if (searchTerm) {
            this.coursesService
                .filterCourses(searchTerm.split(' ').join(','))
                .subscribe({
                    next: (response) => {
                        if (response.result.length > 0) {
                            this.filteredCourses = response.result;
                            this.errorMessage = '';
                        } else {
                            this.errorMessage =
                                'Course with this title does not exist.';
                        }
                    },
                    error: (error) => console.log(error),
                });
        }
    }
}
