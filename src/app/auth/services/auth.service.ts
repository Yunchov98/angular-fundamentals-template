import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import User from '@app/core/interfaces/user';

import { SessionStorageService } from './session-storage.service';

import { CONSTANTS } from '@app/core/environments/constants';
import { ENDPOINTS } from '@app/core/environments/endpoints';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> =
        this.isAuthorized$$.asObservable();
    private apiUrl = CONSTANTS.host;

    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService
    ) {}

    login(user: User): Observable<{
        successful: boolean;
        result: string;
        user: User;
    }> {
        return this.http
            .post<{
                successful: boolean;
                result: string;
                user: User;
            }>(this.apiUrl + ENDPOINTS.login, user)
            .pipe(
                tap((response) => {
                    this.sessionStorage.setToken(response.result);
                    this.isAuthorized$$.next(true);
                })
            );
    }

    logout(): void {
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false);
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl + ENDPOINTS.register, user);
    }

    get isAuthorized(): boolean {
        return this.sessionStorage.getToken() !== null;
    }

    set isAuthorized(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl(): string {
        return ENDPOINTS.login;
    }
}
