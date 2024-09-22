import { Component, EventEmitter, Input, Output } from '@angular/core';

import Course from '@app/core/interfaces/course';
import { faIcons } from '@app/shared/common/fa-icons';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
})
export class CourseListComponent {
    @Input() courses!: Course[];
    @Input() editable!: boolean;

    @Output() showCourse = new EventEmitter<Course>();
    @Output() editCourse = new EventEmitter<Course>();
    @Output() deleteCourse = new EventEmitter<Course>();

    editIcon = faIcons.edit;
    deleteIcon = faIcons.delete;

    onShowCourse(course: Course) {
        this.showCourse.emit(course);
    }

    onEditCourse(course: Course) {
        this.editCourse.emit(course);
    }

    onDeleteCourse(course: Course) {
        this.deleteCourse.emit(course);
    }
}
