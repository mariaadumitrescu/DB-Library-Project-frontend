import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/autentication.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../services/user.service';
import {FullUser} from '../models/fullUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private navbarOpen: any;
  private decode: any;
  private email : any;
  private currentUser: any;
  private fullUser: FullUser;
  constructor(private authenticationService :AuthenticationService,
              private router :Router,
              private userService :UserService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
    if(this.currentUser){
      this.decode = jwt_decode(localStorage.getItem('currentUser'));
      this.email = this.decode['sub'];
      this.userService.getUserByEmail(this.email).subscribe(user => this.fullUser=user);
    }else {
      this.email = "No user";
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  goToBorrowedBooks() {
    this.router.navigate(["/borrowed-books"]);
  }
}
