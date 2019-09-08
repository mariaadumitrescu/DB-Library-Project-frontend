import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/autentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

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

  ngOnDestroy(): void {
    if (document.getElementById('testScript')) {
      document.getElementById('testScript').remove();
    }
    let testScript = document.createElement('script');
    testScript.setAttribute('id', 'testScript');
    testScript.setAttribute('src', 'assets/js/stopRipple.js');
    document.body.appendChild(testScript);
    testScript.remove();
  }

  ngAfterViewInit(): void {
    if (document.getElementById('testScript')) {
      document.getElementById('testScript').remove();
    }

    let testScript = document.createElement('script');
    testScript.setAttribute('id', 'testScript');
    testScript.setAttribute('src', 'assets/js/startRipple.js');
    document.body.appendChild(testScript);
  }
}
