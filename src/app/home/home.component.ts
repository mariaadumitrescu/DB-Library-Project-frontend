import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/autentication.service';
import {DialogLoginService} from '../services/dialog-login-profile/dialog-login.service';
import {DialogRegisterService} from '../services/dialog-register-profile/dialog-register.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private dialogLoginService: DialogLoginService,
              private dialogRegisterService: DialogRegisterService) {
  }


  sendToLogin() {
    $.when().then(() => {
      $('#background').ripples('destroy');
      this.loginDialog();
    });
  }

  loginDialog() {
    this.dialogLoginService.confirm('Login', 'Submit your login details').then(confirmed => {
      if (!confirmed) {
        this.registerDialog();
      }
    })
      .catch(() => {
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
        $(function() {
          $('#background').ripples({
              dropRadius: 20,
              perturbance: 0.002,
              resolution: 256
            }
          );
        });
      });
  }

  registerDialog() {
    this.dialogRegisterService.confirm('Register', 'Submit your register details').then(confirm => {
      if (!confirm) {
        this.loginDialog();
      }
    })
      .catch(() => {
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
        $(function() {
          $('#background').ripples({
              dropRadius: 20,
              perturbance: 0.002,
              resolution: 256
            }
          );
        });
      });
  }

  sendToRegister() {
    $.when().then(() => {
      $('#background').ripples('destroy');
      this.registerDialog();
    });
  }


  ngOnInit(): void {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.router.navigate(['/grid-books']);
    }

    $(function() {
      $('#background').ripples({
          dropRadius: 20,
          perturbance: 0.002,
          resolution: 256
        }
      );
    });

  }

  ngOnDestroy(): void {
    $.when().then(r => {
      $('#background').ripples('destroy');
    });
  }

}
