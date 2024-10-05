import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
    getAllCourses,
    getCourse,
    getCourses,
    getErrorMessage,
    isAllCoursesLoadingSelector,
    isSearchingStateSelector,
    isSingleCourseLoadingSelector,
} from './courses.selectors';
import {
    requestAllCourses,
    requestCreateCourse,
    requestDeleteCourse,
    requestEditCourse,
    requestFilteredCourses,
    requestSingleCourse,
} from './courses.actions';

import Course from '@app/core/interfaces/course';
import { CoursesState } from '@app/core/interfaces/coursesState';

@Injectable({
    providedIn: 'root',
})
export class CoursesStateFacade {
    constructor(private store: Store<CoursesState>) {}

    isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
        select(isAllCoursesLoadingSelector)
    );
    isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
        select(isSingleCourseLoadingSelector)
    );
    isSearchingState$: Observable<boolean> = this.store.pipe(
        select(isSearchingStateSelector)
    );
    courses$: Observable<Course[]> = this.store.pipe(select(getCourses));
    allCourses$: Observable<Course[]> = this.store.pipe(select(getAllCourses));
    course$: Observable<Course | null> = this.store.pipe(select(getCourse));
    errorMessage$: Observable<string> = this.store.pipe(
        select(getErrorMessage)
    );

    getAllCourses(): void {
        this.store.dispatch(requestAllCourses());
    }

    getSingleCourse(id: string): void {
        this.store.dispatch(requestSingleCourse({ id }));
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(requestFilteredCourses({ title: searchValue }));
    }

    editCourse(body: Course, id: string) {
        this.store.dispatch(requestEditCourse({ course: body, id }));
    }

    createCourse(body: Course) {
        this.store.dispatch(requestCreateCourse({ course: body }));
    }

    deleteCourse(id: string) {
        this.store.dispatch(requestDeleteCourse({ id }));
    }
}
