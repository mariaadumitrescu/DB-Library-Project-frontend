import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {AuthenticationService} from '../../services/autentication.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  sendToLogin() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
