import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
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

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
