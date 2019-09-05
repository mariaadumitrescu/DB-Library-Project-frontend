import {Component, OnInit} from '@angular/core';
import {UserBookService} from '../../services/userBook.service';
import {AuthenticationService} from '../../services/autentication.service';
import {User} from '../../models/user';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../../services/user.service';
import {Book} from '../../models/book';
import {UserBook} from '../../models/userBook';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {
  private decoded: any;
  private currentUser: User;
  private showBorrowed: boolean;

  constructor(private userService: UserService, private userBookService: UserBookService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    this.userService.getUserByEmail(this.decoded.sub).toPromise()
      .then(t => {
        this.currentUser = t;
        this.getBorrowedBooks();
      });

  }

  returnBorrowBook(book: Book) {
    this.userBookService.returnBorrowBook(this.currentUser, book).subscribe(t => console.log(t));
    this.getBorrowedBooks();
  }

  getBorrowedBooks() {
    //this.userBookService.getBorrowedBooks(this.currentUser).subscribe(b=>this.userBooks = b);
  }

  showBorrowedBooks() {
      this.showBorrowed = !this.showBorrowed;
  }
}
