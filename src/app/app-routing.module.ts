import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () =>
            import('./shared/shared.module').then((m) => m.SharedModule),
    },
    {
        path: 'registration',
        loadChildren: () =>
            import('./shared/shared.module').then((m) => m.SharedModule),
    },
    {
        path: 'courses',
        loadChildren: () =>
            import('./features/courses/courses.module').then(
                (m) => m.CoursesModule
            ),
    },
    {
        path: '**',
        redirectTo: '/courses',
    },
];
