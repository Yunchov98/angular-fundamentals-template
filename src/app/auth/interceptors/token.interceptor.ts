import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session-storage.service';

import { ROUTES } from '@app/core/environments/endpoints';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        private sessionStorage: SessionStorageService
    ) {}

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const token = this.sessionStorage?.getToken();

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `${token}`,
                },
            });
        }

        return next.handle(req).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.authService.logout();
                    this.router.navigate([ROUTES.login]);
                }

                return throwError(() => err);
            })
        );
    }
}
