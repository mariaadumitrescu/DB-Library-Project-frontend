import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

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

  constructor(private userService: UserService) { }

  ngOnInit() {
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
