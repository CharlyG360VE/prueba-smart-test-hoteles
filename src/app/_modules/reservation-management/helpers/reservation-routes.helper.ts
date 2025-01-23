import { eAppRoutes } from '@/_enums/app-routes.enum';
import { eRole } from '@/_enums/role.enum';
import { ROLE_GUARD } from '@/_guards/role.guard';
import { Routes } from '@angular/router';

export const RESERVATION_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: (async () => await import('../components/reservation-management/reservation-management.component')),
  },
  {
    path: eAppRoutes.RESERVATION_CREATE,
    data: { role: eRole.USER },
    canActivate: [ROLE_GUARD],
    loadComponent: (async () => await import('../components/reservation-form/reservation-form.component')),
  },
  {
    path: eAppRoutes.RESERVATION_DETAIL,
    data: { role: eRole.ADMIN },
    canActivate: [ROLE_GUARD],
    loadComponent: (async () => await import('../components/reservations-detail/reservations-detail.component')),
  }
];

export const RESERVATION_ROUTES: Routes = [
  {
    path: eAppRoutes.RESERVATION,
    loadComponent: (async () => await import('../components/reservation-management-layout/reservation-management-layout.component')),
    children: [
      ...RESERVATION_MANAGEMENT_ROUTES
    ]
  }
];