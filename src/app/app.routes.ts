import { eAppRoutes } from '@/_enums/app-routes.enum';
import { AUTH_GUARD } from '@/_guards/auth.guard';
import { NO_AUTH_GUARD } from '@/_guards/no-auth.guard';
import { HOME_ROUTES } from '@/home/helpers/home-routes.helper';
import { HOTEL_ROUTES } from '@/hotel-management/helpers/hotel-routes.helper';
import { RESERVATION_ROUTES } from '@/reservation-management/helpers/reservation-routes.helper';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: eAppRoutes.HOME
  },
  {
    path: eAppRoutes.PRINCIPAL,
    loadComponent: (async () => await import('@/layout/layout.component')),
    canActivate: [AUTH_GUARD],
    children: [
      ...HOTEL_ROUTES,
      ...RESERVATION_ROUTES,
      ...HOME_ROUTES
    ]
  },
  {
    path: eAppRoutes.LOGIN,
    canActivate: [NO_AUTH_GUARD],
    loadComponent: (async () => await import('@/user/components/login/login.component'))
  }
];
