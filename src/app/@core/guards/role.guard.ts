import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/+auth';
import { Observable } from 'rxjs';
import { RoleList } from '../shared/role';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeRoles = next.data.roles as RoleList[];
    const userRole = this.authService.getUser.role;
    const hasRole = routeRoles && userRole && routeRoles.some((routeRole) => routeRole === userRole);

    if (hasRole) {
      return true;
    }

    this.router.navigate(['/not-found']);
    return false;
  }
}
