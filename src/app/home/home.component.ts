import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/autentication.service';

declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }


  sendToLogin() {
    $.when().then(() => {
      $('#background').ripples('destroy');
      this.router.navigate(['/login']);
    })
  }

  sendToRegister() {
    $.when().then(() => {
      $('#background').ripples('destroy');
      this.router.navigate(['/register']);
    })
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
        resolution:256
        }
      )
    });

  }

  ngOnDestroy(): void {
    $.when().then(r => {
      $('#background').ripples('destroy');
    })
  }

}
