import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '@shared/shared.module';
import { CoursesModule } from './features/courses/courses.module';

import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { CoursesComponent } from './features/courses/courses.component';

import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';

import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';

@NgModule({
    declarations: [AppComponent, CourseInfoComponent, CoursesComponent],
    imports: [BrowserModule, SharedModule, FontAwesomeModule, CoursesModule],
    providers: [
        AuthorizedGuard,
        NotAuthorizedGuard,
        CoursesService,
        CoursesStoreService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
