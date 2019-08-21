import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Registration} from '../../models/registration';
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

  onBtnRegisterClick() {

    const user = new User(this.userFirstName,this.userLastName,this.userPassword,this.userEmail);

    this.userService.registerUser(user).subscribe(value => {
    });
  }

  ngOnInit(): void {
  }
}
