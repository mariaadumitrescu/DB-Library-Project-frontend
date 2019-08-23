import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/autentication.service';
import * as jwt_decode from 'jwt-decode';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  private decoded: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      const token = this.authenticationService.currentUserValue.token;
      this.decoded = jwt_decode(token);
      const date = new Date(0).setUTCSeconds(this.decoded.exp);
      if (date.valueOf() > new Date().valueOf()) {
        if (localStorage.getItem('isEnabled') ==='true') {
          return true;
        }else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
