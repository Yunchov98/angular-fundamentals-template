import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ROUTES } from '@app/core/environments/endpoints';
import { CoursesService } from '@app/services/courses.service';

import {
    requestAllCourses,
    requestAllCoursesFail,
    requestAllCoursesSuccess,
    requestCreateCourse,
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

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router
    ) {}

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestAllCourses),
            mergeMap(() =>
                this.coursesService.getAll().pipe(
                    map((response) =>
                        requestAllCoursesSuccess({
                            courses: response.result,
                        })
                    ),
                    catchError((error) =>
                        of(requestAllCoursesFail({ error: error.message }))
                    )
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestFilteredCourses),
            mergeMap((action) =>
                this.coursesService.filterCourses(action.title).pipe(
                    map((respone) =>
                        requestFilteredCoursesSuccess({
                            courses: respone.result,
                        })
                    ),
                    catchError((error) =>
                        of(requestFilteredCoursesFail({ error }))
                    )
                )
            )
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestSingleCourse),
            mergeMap((action) =>
                this.coursesService.getCourse(action.id).pipe(
                    map((response) =>
                        requestSingleCourseSuccess({ course: response.result })
                    ),
                    catchError((error) =>
                        of(requestSingleCourseFail({ error }))
                    )
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestDeleteCourse),
            mergeMap((action) =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(() => requestAllCourses()),
                    catchError((error) =>
                        of(requestDeleteCourseFail({ error }))
                    )
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestEditCourse),
            mergeMap((action) =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map((response) =>
                        requestEditCourseSuccess({ course: response.result })
                    ),
                    catchError((error) => of(requestEditCourseFail({ error })))
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestCreateCourse),
            mergeMap((action) =>
                this.coursesService.createCourse(action.course).pipe(
                    map((response) =>
                        requestEditCourseSuccess({ course: response.result })
                    ),
                    catchError((error) => of(requestEditCourseFail({ error })))
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    requestCreateCourseSuccess,
                    requestEditCourseSuccess,
                    requestSingleCourseFail
                ),
                tap(() => this.router.navigate([ROUTES.courses]))
            ),
        { dispatch: false }
    );
}
