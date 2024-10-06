import { Action, createReducer, on } from '@ngrx/store';

import {
    requestAllCourses,
    requestAllCoursesFail,
    requestAllCoursesSuccess,
    requestCreateCourse,
    requestCreateCourseFail,
    requestCreateCourseSuccess,
    requestDeleteCourse,
    requestDeleteCourseFail,
    requestDeleteCourseSuccess,
    requestEditCourse,
    requestEditCourseFail,
    requestEditCourseSuccess,
    requestFilteredCourses,
    requestFilteredCoursesFail,
    requestFilteredCoursesSuccess,
    requestSingleCourse,
    requestSingleCourseFail,
    requestSingleCourseSuccess,
} from './courses.actions';

export const coursesFeatureKey = 'courses';

import Course from '@app/core/interfaces/course';

export interface CoursesState {
    allCourses: Course[];
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: '',
};

export const coursesReducer = createReducer(
    initialState,
    on(requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
    })),
    on(requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
    })),
    on(requestAllCoursesFail, (state, { error }) => ({
        ...state,
        errorMessage: typeof error === 'string' ? error : error.message,
        isAllCoursesLoading: false,
    })),
    on(requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
    })),
    on(requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false,
    })),
    on(requestSingleCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: typeof error === 'string' ? error : error.message,
        isSingleCourseLoading: false,
    })),
    on(requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        isAllCoursesLoading: true,
    })),
    on(requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isSearchState: false,
        isAllCoursesLoading: false,
    })),
    on(requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        errorMessage: typeof error === 'string' ? error : error.message,
        isAllCoursesLoading: false,
    })),
    on(requestDeleteCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
    })),
    on(requestDeleteCourseSuccess, (state) => ({
        ...state,
        isAllCoursesLoading: false,
    })),
    on(requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: typeof error === 'string' ? error : error.message,
        isAllCoursesLoading: false,
    })),
    on(requestEditCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
    })),
    on(requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isAllCoursesLoading: false,
    })),
    on(requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: typeof error === 'string' ? error : error.message,
        isAllCoursesLoading: false,
    })),
    on(requestCreateCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
    })),
    on(requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false,
    })),
    on(requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: typeof error === 'string' ? error : error.message,
        isSingleCourseLoading: false,
    }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
    coursesReducer(state, action);
