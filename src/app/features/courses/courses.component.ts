import { Component } from '@angular/core';

import { mockedCoursesList } from '@app/shared/mocks/mock';
import { mockedAuthorsList } from '@app/shared/mocks/mock';

import Course from '@app/core/interfaces/course';
import Author from '@app/core/interfaces/author';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
})
export class CoursesComponent {
    courses: Course[] = mockedCoursesList;
    authors: Author[] = mockedAuthorsList;
    selectedCourse!: Course;
    isShowButtonClicked!: boolean;

    getauthorName(authorIds: string[]): string[] {
        return authorIds.map((id) => {
            const author = this.authors.find((a) => a.id === id);

            return author ? author.name : 'Unknown author';
        });
    }

    mappedCourses = this.courses.map((course) => ({
        ...course,
        authors: this.getauthorName(course.authors),
    }));

    onShowCourse(course: Course) {
        this.selectedCourse = course;
        this.isShowButtonClicked = true;
    }

    onBack() {
        this.isShowButtonClicked = false;
    }
}
