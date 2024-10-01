import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from './user.service';
import UserMe from '@app/core/interfaces/user-me';
import { CONSTANTS } from '@app/core/environments/constants';
import User from '@app/core/interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class UserStoreService implements OnDestroy {
    private name$$ = new BehaviorSubject<string>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$: Observable<string> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    subscription$!: Subscription;

    constructor(private userService: UserService) {}

    getUser(): Observable<UserMe> {
        return new Observable<UserMe>((observer) => {
            this.subscription$ = this.userService.getUser().subscribe({
                next: (user: UserMe) => {
                    this.isAdmin$$.next(
                        user.result.role === CONSTANTS.adminRole
                    );
                    this.name$$.next(user.result.name);
                    observer.next(user);
                    observer.complete();
                },
                error: () => {
                    this.name$$.next('');
                    this.isAdmin$$.next(false);
                },
            });
        });
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
