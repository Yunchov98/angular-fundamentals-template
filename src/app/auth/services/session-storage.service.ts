import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CONSTANTS } from '@app/core/environments/constants';

const WINDOW = new InjectionToken<Window>('WindowToken', {
    providedIn: 'root',
    factory: () => window,
});

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {
    constructor(@Inject(WINDOW) private window: Window) {}

    setToken(token: string): void {
        this.window.sessionStorage.setItem(CONSTANTS.TOKEN, token);
    }

    getToken(): string | null {
        return this.window.sessionStorage.getItem(CONSTANTS.TOKEN);
    }

    deleteToken(): void {
        this.window.sessionStorage.removeItem(CONSTANTS.TOKEN);
    }
}
