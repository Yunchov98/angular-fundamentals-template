import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'courses-app';
    isLoggedIn: boolean = true;

    onLoginToggleHandler() {
        this.isLoggedIn = !this.isLoggedIn;
    }
}
