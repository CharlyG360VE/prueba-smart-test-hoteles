import { LoginService } from '@/user/services/login.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const ROLE_GUARD: CanActivateFn = (route, state) => {
  const LOGIN_SERVICE = inject(LoginService)
  const ROUTER = inject(Router)
  const USER_LOGGED = LOGIN_SERVICE.userLogin;
  const USER_ROLE = route.data['role'];

  if (USER_ROLE !== USER_LOGGED?.role) {
    ROUTER.navigate(['/reservacion']);

    return false;
  };

  return USER_ROLE === USER_LOGGED?.role
};
