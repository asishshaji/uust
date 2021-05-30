import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (!!localStorage.getItem('token')) {
      return true
    } else {
      this._router.navigate(['login'])
      return false
    }
  }
}
