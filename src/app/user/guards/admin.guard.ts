import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';
import { ROUTES } from '@app/core/environments/endpoints';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private userStore: UserStoreService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.userStore.isAdmin$.pipe(
            map((isAdmin: boolean) => {
                if (isAdmin) {
                    return true;
                } else {
                    return this.router.createUrlTree([ROUTES.courses]);
                }
            })
        );
    }
}
