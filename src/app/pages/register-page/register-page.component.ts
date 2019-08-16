import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  userFirstName: string;
  userLastName: string;
  userPassword: string;
  userMatchingPassword: string;
  userEmail: string;
  private ownerForm: FormGroup;
  private validateemail: FormControl;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  validate(){
    console.log("validate is working");
    this.validateemail = new FormControl(this.userEmail,[Validators.required, Validators.email]);

    this.ownerForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email])
    });
  }
  onBtnRegisterClick() {

    const user = {firstName: this.userFirstName,
      lastName: this.userLastName,
      password: this.userPassword,
      matchingPassword: this.userMatchingPassword,
      email: this.userEmail
    };
    console.log(user);
    this.userService.addNewUser(user);
  }
}
