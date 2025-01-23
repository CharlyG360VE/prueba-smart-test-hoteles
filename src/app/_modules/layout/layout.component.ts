import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { LoginService } from '@/user/services/login.service';
import { eRole } from '@/_enums/role.enum';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export default class LayoutComponent {

  private _router = inject(Router);
  private _loginSvc = inject(LoginService);

  isAdmin = false

  ngOnInit() {
    this.setUserAndCheckAdmin();
  }

  logout() {
    window.localStorage.removeItem('user');
    this._router.navigate(['/iniciar-sesion']);
  }

  private setUserAndCheckAdmin() {
    const USER = this._loginSvc.userLogin!;

    this.isAdmin = USER.role === eRole.ADMIN;
  }

}
