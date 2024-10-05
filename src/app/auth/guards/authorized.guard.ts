import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ROUTES } from '@app/core/environments/endpoints';
import { UserStoreService } from '@app/user/services/user-store.service';

@Injectable({
    providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private userStoreService: UserStoreService
    ) {}

    canActivate(): boolean | UrlTree {
        if (!this.authService.isAuthorized) {
            return this.router.createUrlTree([ROUTES.login]);
        }

        const isAdmin = this.userStoreService.isAdmin;

        if (isAdmin) {
            return true;
        }

        return true;
    }
}
