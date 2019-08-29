import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/autentication.service';
import * as jwt_decode from 'jwt-decode';
import {RegisterPageComponent} from '../pages/register-page/register-page.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private email: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
    let token = this.authenticationService.getToken();
    let decode = jwt_decode(token);
    this.email = decode.sub;
    console.log(this.email);
  }


  sendToNewsFeed() {
    this.router.navigateByUrl('/grid-books');
  }

  sendToUsername() {
    this.router.navigateByUrl('/user');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('');
  }

}
