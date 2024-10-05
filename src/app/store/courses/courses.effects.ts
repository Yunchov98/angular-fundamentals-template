import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CoursesService } from '@app/services/courses.service';
import {
    requestAllCourses,
    requestAllCoursesFail,
    requestAllCoursesSuccess,
} from './courses.actions';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService
    ) {}

    getAll$ = createEffect(
        () =>
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
            ),
        { dispatch: false }
    );
}
