import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import Course from '@app/core/interfaces/course.interface';
import Author from '@app/core/interfaces/author.interface';

import { CoursesService } from '@app/services/courses.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit, OnDestroy {
    coursesSubscribe$!: Subscription;
    authorsSubscribe$!: Subscription;
    courses: Course[] = [];
    filteredCourses: Course[] = [];
    authors: Author[] = [];
    selectedCourse!: Course;
    isShowButtonClicked!: boolean;
    errorMessage!: string;

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
        this
    }

    onBack() {
        this.isShowButtonClicked = false;
    }

    onSearch(searchTerm: string): void {
        if (searchTerm) {
            this.coursesService.filterCourses(searchTerm).subscribe({
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
