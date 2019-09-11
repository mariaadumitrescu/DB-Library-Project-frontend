import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {FullUser} from '../models/fullUser';
import {AuthenticationService} from '../services/autentication.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

  private user: FullUser;

  constructor(private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = this.authenticationService.getToken();
    let decode = jwt_decode(token);
    let email = decode['sub'];
    this.user = await this.userService.getUserByEmail(email).toPromise();
    if(this.user.admin){
      return true;
    }else {
      this.router.navigate(['']);
      return false;
    }
  }


}
