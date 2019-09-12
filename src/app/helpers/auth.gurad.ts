import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/autentication.service';
import * as jwt_decode from 'jwt-decode';
import {ConfirmationDialogService} from '../services/dialog-confirm/dialog-confirm.service';
import {DialogBannedService} from '../services/dialog-banned/dialog-banned.service';
import {DialogActivateAccountService} from '../services/dialog-activate-account/dialog-activate-account.service';
import {UserService} from '../services/user.service';
import {FullUser} from '../models/fullUser';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  private decoded: any;
  private currentUser: FullUser;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialogBannedService: DialogBannedService,
    private confirmationDialogService: ConfirmationDialogService,
    private activateAccountService: DialogActivateAccountService,
    private userService: UserService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    let email = this.decoded['sub'];
    this.currentUser = await this.userService.getUserByEmail(email).toPromise();

    if (new Date(this.currentUser.banUntil) < new Date()) {
      this.currentUser.banned =false;
      this.currentUser.banUntil = null;
      await this.userService.updateUser(this.currentUser).toPromise();
      await this.userService.getUserByEmail(email).toPromise();
    }


    if (this.currentUser) {
      const date = new Date(0).setUTCSeconds(this.decoded.exp);
      if (date.valueOf() > new Date().valueOf()) {
        if (this.currentUser.enabled) {
          if (!this.currentUser.banned) {
            return true;
          } else {
            this.bannedUserDialog();
            return false;
          }
        } else {
          this.notEnabledUserDialog(this.decoded.sub);
          return false;
        }
      } else {
        this.authenticationService.logout();
      }
    } else {
      this.authenticationService.logout();
    }
  }

  bannedUserDialog() {
    this.router.navigate(['']);
    this.dialogBannedService.confirm('This account is banned!', 'Please contact your library administrator!')
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  notEnabledUserDialog(email: string) {
    this.activateAccountService.confirm('This account is not activated', 'Please activate your account').catch(() => {
      this.authenticationService.logout();
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
    });
  }

}
