import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";

export const AuthGuard: CanActivateFn = async (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AuthService);
    const [isLoggedIn, _] = await authService.getUserIfExists();
    return isLoggedIn;
  };
  