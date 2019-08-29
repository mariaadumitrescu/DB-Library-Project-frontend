import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Registration} from '../../models/registration';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  match = false;
  password: string;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
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

  sendToLogin() {
    this.router.navigate(['/login']);
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
      this.sendToLogin();
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }
}

