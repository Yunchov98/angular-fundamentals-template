import { Injectable, OnDestroy } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    Observable,
    of,
    Subscription,
    tap,
    throwError,
} from 'rxjs';

import UserMe from '@app/core/interfaces/user-me';

import { UserService } from './user.service';
import { SessionStorageService } from '@app/auth/services/session-storage.service';

import { CONSTANTS } from '@app/core/environments/constants';

@Injectable({
    providedIn: 'root',
})
export class UserStoreService implements OnDestroy {
    private name$$ = new BehaviorSubject<string>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$: Observable<string> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    subscription$!: Subscription;

    constructor(
        private userService: UserService,
        private sessionStorageService: SessionStorageService
    ) {}

    getUser(): Observable<UserMe | null> {
        const token = this.sessionStorageService.getToken();

        if (token) {
            return this.userService.getUser().pipe(
                tap((user: UserMe) => {
                    if (user) {
                        this.name$$.next(user.result.name);

                        this.isAdmin$$.next(
                            user.result.role === CONSTANTS.adminRole
                        );
                    } else {
                        this.isAdmin$$.next(false);
                    }
                }),
                catchError((error) => {
                    console.error('Error fetching user:', error);
                    this.isAdmin$$.next(false);
                    return throwError(() => error);
                })
            );
        } else {
            this.isAdmin$$.next(false);
            return of(null);
        }
    }

    get isAdmin(): boolean {
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
