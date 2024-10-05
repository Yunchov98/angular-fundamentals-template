import { createAction, props } from '@ngrx/store';

import { CoursesConstants } from '@app/store/courses/courses.constants';

import { ErrorProp } from '@app/core/interfaces/errorProp';
import { CourseProp } from '@app/core/interfaces/courseProp';
import { CoursesProp } from '@app/core/interfaces/coursesProp';
import { EditCourseProp } from '@app/core/interfaces/editCourseProp';
import { DeleteCourseProp } from '@app/core/interfaces/deleteCourseProp';

export const requestAllCourses = createAction(
    CoursesConstants.REQUEST_ALL_COURSES
);

export const requestAllCoursesSuccess = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
    props<CoursesProp>()
);

export const requestAllCoursesFail = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_FAIL,
    props<ErrorProp>()
);

export const requestSingleCourse = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE,
    props<{id: string}>()
);

export const requestSingleCourseSuccess = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS,
    props<CourseProp>()
);

export const requestSingleCourseFail = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
    props<ErrorProp>()
);

export const requestFilteredCourses = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES,
    props<{ title: string }>()
);

export const requestFilteredCoursesSuccess = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
    props<CourseProp>()
);

export const requestFilteredCoursesFail = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
    props<ErrorProp>()
);

export const requestDeleteCourse = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE,
    props<DeleteCourseProp>()
);

export const requestDeleteCourseSuccess = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS
);

export const requestDeleteCourseFail = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_FAIL,
    props<ErrorProp>()
);

export const requestEditCourse = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE,
    props<EditCourseProp>()
);

export const requestEditCourseSuccess = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
    props<CourseProp>()
);

export const requestEditCourseFail = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
    props<ErrorProp>()
);

export const requestCreateCourse = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE,
    props<CourseProp>()
);

export const requestCreateCourseSuccess = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
    props<CourseProp>()
);

export const requestCreateCourseFail = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_FAIL,
    props<ErrorProp>()
);
