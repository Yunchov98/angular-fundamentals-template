import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import UserMe from '@app/core/interfaces/user-me';
import { CONSTANTS } from '@app/core/environments/constants';
import { ENDPOINTS, ROUTES } from '@app/core/environments/endpoints';
import { SessionStorageService } from '@app/auth/services/session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = CONSTANTS.HOST;

    constructor(
        private sessionStorage: SessionStorageService,
        private http: HttpClient,
        private router: Router
    ) {}

    getUser(): Observable<UserMe> {
        const TOKEN = this.sessionStorage.getToken();

        if (TOKEN) {
            return this.http.get<UserMe>(this.apiUrl + ENDPOINTS.getUser).pipe(
                catchError((error) => {
                    if (error.status === 401) {
                        this.sessionStorage.deleteToken();
                        this.router.navigate([ROUTES.login]);
                    }
                    return throwError(() => new Error('Failed to fetch user'));
                })
            );
        } else {
            return throwError(() => new Error('Token is missing'));
        }
    }
}
