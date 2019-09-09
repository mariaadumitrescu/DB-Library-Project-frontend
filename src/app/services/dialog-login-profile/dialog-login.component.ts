import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../autentication.service';
import {UserService} from '../user.service';
import {first} from 'rxjs/operators';
import {DialogRegisterService} from '../dialog-register-profile/dialog-register.service';

declare var $: any;

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  private user: any;

  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private dialogRegisterService :DialogRegisterService) {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.userService.setLocalStorage(this.f.username.value).subscribe(user => {
            this.user = user;
            //clear old penalties
            this.userService.clearPenalties(user);
            this.userService.checkForPenalties(user).subscribe(p => console.log(p));
            this.router.navigate(['/grid-books']);
            this.activeModal.close(true);
          });
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  registerDialog() {
    $.when().then(() => {
      $('#background').ripples('destroy');
      this.accept();
    });
    this.dialogRegisterService.confirm('Register', 'Submit your register details').then(() => {
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

}
