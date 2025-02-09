import { Component, computed, inject, signal } from '@angular/core';
import { LAYOUT_IMPORTS } from './utils/layout-imports.helper';
import { Router } from '@angular/router';
import { DialogService } from '@/_services/dialog.service';
import { IMenuItem } from '@/_interfaces/menu.interface';
import { MenuService } from '@/_services/menu.service';
import { LoginService } from '@/user/services/login.service';
import { eRole } from '@/_enums/role.enum';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: LAYOUT_IMPORTS,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export default class LayoutComponent {

  private readonly _loginSvc = inject(LoginService);
  private readonly _router = inject(Router);
  private readonly _dialogSvc = inject(DialogService);
  private readonly _menuSvc = inject(MenuService);

  menuItems: IMenuItem[] = []
  collapsed = signal(true);
  sidenavWidth = computed(() => this.collapsed() ? '5.6em' : '15em')
  profilePicSize = computed(() => this.collapsed() ? '32' : '100')

  get fullname() {
    return `${ this._loginSvc.userLogin?.firstName } ${ this._loginSvc.userLogin?.lastName }`
  }
  get roleName() {
    return this._loginSvc.userLogin?.role === eRole.ADMIN ? 'Administrador' : 'Cliente';
  }

  ngOnInit() {
    this.menuItems = this._menuSvc.getMenu();
  }

  logout() {
    window.localStorage.removeItem('user');
    this._dialogSvc.alertDialog('', 'Cierre de sesión exitoso.');
    this._router.navigate(['/iniciar-sesion']);
  }

}
