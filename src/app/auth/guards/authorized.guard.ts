import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ROUTES } from '@app/core/environments/endpoints';
import { UserStoreService } from '@app/user/services/user-store.service';

@Injectable({
    providedIn: 'root',
})
export class AuthorizedGuard {
    constructor(
        private authService: AuthService,
        private router: Router,
        private userStoreService: UserStoreService
    ) {}

    canLoad(): boolean | UrlTree {
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
