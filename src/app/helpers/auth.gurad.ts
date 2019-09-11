import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/autentication.service';
import * as jwt_decode from 'jwt-decode';
import {ConfirmationDialogService} from '../services/dialog-confirm/dialog-confirm.service';
import {Book} from '../models/book';
import {DialogBannedService} from '../services/dialog-banned/dialog-banned.service';
import {DialogActivateAccountService} from '../services/dialog-activate-account/dialog-activate-account.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  private decoded: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialogBannedService: DialogBannedService,
    private confirmationDialogService: ConfirmationDialogService,
    private activateAccountService: DialogActivateAccountService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = this.authenticationService.currentUserValue.token;
      this.decoded = jwt_decode(token);
      const date = new Date(0).setUTCSeconds(this.decoded.exp);
      if (date.valueOf() > new Date().valueOf()) {
        if (localStorage.getItem('isEnabled') == 'true') {
          if (localStorage.getItem('isBanned') == 'false') {
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
    localStorage.clear();
    this.router.navigate(['']);
    this.dialogBannedService.confirm('This account is banned!', 'Please contact your library administrator!')
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  notEnabledUserDialog(email: string) {
    this.activateAccountService.confirm('This account is not activated', 'Please activate your account').
    catch(() => {
      this.authenticationService.logout();
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
    });
  }

}
