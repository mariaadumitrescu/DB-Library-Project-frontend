import { Component, OnInit } from '@angular/core';
import {UserBookService} from '../../services/userBook.service';
import {AuthenticationService} from '../../services/autentication.service';
import {User} from '../../models/user';
import * as jwt_decode from "jwt-decode";
import {UserService} from '../../services/user.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {
  private decoded: any;
  private books: Book[];


  constructor(private userService:UserService, private userBookService:UserBookService, private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.getBorrowedBooks();
  }

  async getBorrowedBooks(){
      const token = this.authenticationService.getToken();
      this.decoded = jwt_decode(token);
      let currentUser = await this.userService.getUserByEmail(this.decoded.sub).toPromise();

      console.log('a');
      console.log(this.userBookService.getBorrowedBooks(currentUser).subscribe(t=>this.books = t));
    }
}
