import { eAppRoutes } from '@/_enums/app-routes.enum';
import { eRole } from '@/_enums/role.enum';
import { ROLE_GUARD } from '@/_guards/role.guard';
import { Routes } from '@angular/router';

export const HOTEL_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    data: { role: eRole.ADMIN },
    canActivate: [ROLE_GUARD],
    loadComponent: (async () => await import('../components/hotel-management/hotel-management.component')),
  }
];

export const HOTEL_ROUTES: Routes = [
  {
    path: eAppRoutes.HOTEL,
    loadComponent: (async () => await import('../components/hotel-management-layout/hotel-management-layout.component')),
    children: [
      ...HOTEL_MANAGEMENT_ROUTES
    ]
  }
];
