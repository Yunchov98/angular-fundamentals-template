import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import UserMe from '@app/core/interfaces/user-me';

import { UserService } from './user.service';
import { SessionStorageService } from '@app/auth/services/session-storage.service';

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

    getUser() {
        if (this.sessionStorageService.getToken()) {
            this.userService.getUser().subscribe({
                next: (user: UserMe) => {
                    if (user) {
                        this.name$$.next(user.result.name);

                        if (user.result.role === 'admin') {
                            this.isAdmin$$.next(true);
                        }
                    } else {
                        this.isAdmin$$.next(false);
                    }
                },
                error: (error) => {
                    console.error('Error fetching user:', error);

                    this.isAdmin$$.next(false);
                },
            });
        }
        this.isAdmin$$.next(false);
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
