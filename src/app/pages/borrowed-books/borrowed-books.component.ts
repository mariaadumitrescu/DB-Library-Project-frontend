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
  private  currentUser: User;

  constructor(private userService:UserService, private userBookService:UserBookService, private authenticationService:AuthenticationService) { }

  ngOnInit() {
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    this.userService.getUserByEmail(this.decoded.sub).toPromise()
      .then(t =>{
        this.currentUser = t;
        console.log(this.currentUser.penalties);
        this.userBookService.getBorrowedBooks(t).subscribe(b=>this.books = b);
      });

  }

   returnBorrowBook(book: Book){
    this.userBookService.returnBorrowBook(this.currentUser, book).subscribe(t=>console.log(t));
    }
}
