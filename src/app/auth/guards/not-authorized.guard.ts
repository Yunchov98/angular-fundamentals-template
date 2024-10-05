import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ROUTES } from '@app/core/environments/endpoints';

@Injectable({
    providedIn: 'root',
})
export class NotAuthorizedGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean | UrlTree {
        if (this.authService.isAuthorized) {
            return this.router.createUrlTree([ROUTES.courses]);
        }

        return true;
    }
}
