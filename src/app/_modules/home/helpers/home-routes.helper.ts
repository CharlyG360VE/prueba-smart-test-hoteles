import { eAppRoutes } from '@/_enums/app-routes.enum';
import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: eAppRoutes.HOME,
    loadComponent: (async () => await import('../components/home-layout/home-layout.component')),
  }
];