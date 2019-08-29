import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/autentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }


  sendToLogin() {
    this.router.navigateByUrl('/login');
  }

  sendToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.router.navigate(['/grid-books']);

    }
  }

}
