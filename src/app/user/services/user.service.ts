import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '@app/auth/services/session-storage.service';
import { CONSTANTS } from '@app/core/environments/constants';
import { ENDPOINTS, ROUTES } from '@app/core/environments/endpoints';
import UserMe from '@app/core/interfaces/user-me.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = CONSTANTS.host;

    constructor(
        private sessionStorage: SessionStorageService,
        private http: HttpClient,
        private router: Router
    ) {}

    getUser(): Observable<UserMe> {
        const TOKEN = this.sessionStorage.getToken();

        if (TOKEN) {
            const headers = new HttpHeaders({
                Authorization: `${TOKEN}`,
            });

            return this.http
                .get<UserMe>(this.apiUrl + ENDPOINTS.getUser, { headers })
                .pipe(
                    catchError((error) => {
                        if (error.status === 401) {
                            this.sessionStorage.deleteToken();
                            this.router.navigate([ROUTES.login]);
                        }
                        return throwError(
                            () => new Error('Failed to fetch user')
                        );
                    })
                );
        } else {
            return throwError(() => new Error('Token is missing'));
        }
    }
}
