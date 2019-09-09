import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Registration} from '../../models/registration';
import {DialogLoginService} from '../dialog-login-profile/dialog-login.service';

declare var $: any;

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-register.component.html',
  styleUrls: ['./dialog-register.component.css']
})
export class DialogRegisterComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  match = false;
  password: string;


  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private dialogLoginService: DialogLoginService) {
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userPassword: ['', Validators.required],
      userConfirmPassword: ['', [Validators.required]],
      userEmail: ['', [Validators.required]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const registration = new Registration(this.f.userFirstName.value, this.f.userLastName.value, this.f.userPassword.value, this.f.userEmail.value);

    this.userService.registerUser(registration).subscribe(value => {
      this.dismiss();
      this.loginDialog();
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }

  loginDialog() {
    $.when().then(() => {
      $('#background').ripples('destroy');
      this.accept();
    });
    this.dialogLoginService.confirm('Login', 'Submit your login details').then(() => {
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
