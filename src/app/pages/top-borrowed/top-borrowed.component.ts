import {Component, ElementRef, OnInit} from '@angular/core';
import {ResponsePageList} from '../../models/responsePageList';
import {Book} from '../../models/book';
import {FullUser} from '../../models/fullUser';
import {BookService} from '../../services/book.service';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/autentication.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-top-borrowed',
  templateUrl: './top-borrowed.component.html',
  styleUrls: ['./top-borrowed.component.css']
})
export class TopBorrowedComponent implements OnInit {

  private paginatedPaginatedBooks: ResponsePageList<Book>;
  private books: Book[] = [];
  private p: any;
  private currentUser: FullUser;

  constructor(private bookService: BookService,
              private eRef: ElementRef,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  initListOfBooks() {

    this.bookService.getPaginatedBooks('borrowCount', 'DESC', '0', '4', '').toPromise().then(p => {
      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;

    });

  }


  async ngOnInit() {
    this.p = 0;
    const token = this.authenticationService.getToken();
    let decode = jwt_decode(token);
    let email = decode['sub'];
    await this.userService.getUserByEmail(email).toPromise().then(user => {
      this.currentUser = user;
      this.initListOfBooks();
    });
  }

  pageGridChanged(event) {
    this.p = event;
    this.bookService.getPaginatedBooks('borrowCount', 'DESC', (this.p - 1).toString(), '4', '').subscribe(p => {

      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;
    });
  }

  bookBorrowed(event: boolean) {
    this.bookService.getPaginatedBooks('borrowCount', 'DESC', this.p.toString(), '4', '').subscribe(p => {
      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;
    });
  }

}



