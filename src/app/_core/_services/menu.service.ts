import { eAppRoutes } from '@/_enums/app-routes.enum';
import { eRole } from '@/_enums/role.enum';
import { IMenuItem } from '@/_interfaces/menu.interface';
import { LoginService } from '@/user/services/login.service';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly _loginSvc = inject(LoginService);
  private readonly menuItems = signal<IMenuItem[]>(
    [
      {
        icon: 'home',
        label: 'Inicio',
        role: eRole.PUBLIC,
        route: ''
      },
      {
        icon: 'dashboard',
        label: 'Gestión de hoteles',
        role: eRole.ADMIN,
        route: `/${eAppRoutes.HOTEL}`
      },
      {
        icon: 'home_work',
        label: 'Detalle de reservaciones',
        role: eRole.ADMIN,
        route: `/${eAppRoutes.RESERVATION}/${eAppRoutes.RESERVATION_DETAIL}`
      },
      {
        icon: 'group',
        label: 'Nueva reservación',
        role: eRole.USER,
        route: `/${eAppRoutes.RESERVATION}`
      }
    ]
  )

  constructor() { }

  getMenu() {
    return this.menuItems()
      .filter(menu => this.checkUserRole(menu.role));
  }

  private checkUserRole(role: eRole) {
    return role === eRole.PUBLIC || this._loginSvc.userLogin?.role === role;
  }

}
