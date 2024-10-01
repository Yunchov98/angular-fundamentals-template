import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '@shared/shared.module';
import { CoursesModule } from './features/courses/courses.module';

import { AppComponent } from '@app/app.component';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';

import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';

import { routes } from './app-routing.module';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';

@NgModule({
    declarations: [AppComponent, CourseInfoComponent, CoursesComponent],
    imports: [
        BrowserModule,
        SharedModule,
        FontAwesomeModule,
        CoursesModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        UserModule,
    ],
    providers: [
        AuthorizedGuard,
        NotAuthorizedGuard,
        CoursesService,
        CoursesStoreService,
        { provide: Window, useValue: window },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
