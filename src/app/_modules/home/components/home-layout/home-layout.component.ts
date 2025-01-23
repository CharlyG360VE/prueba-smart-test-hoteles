import { eRole } from '@/_enums/role.enum';
import { LoginService } from '@/user/services/login.service';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  imports: [
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export default class HomeLayoutComponent {

  private _loginSvc = inject(LoginService);

  get isAdminRole() {
    return this._loginSvc.userLogin?.role === eRole.ADMIN
  }

}
