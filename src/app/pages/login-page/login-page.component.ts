import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  userEmail: string;
  userPassword: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }


  onSubmitClick() {
  }
}
