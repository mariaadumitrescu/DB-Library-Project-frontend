import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullUser} from '../../../models/fullUser';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs';
import {ResponsePageList} from '../../../models/responsePageList';
import {UserBookService} from '../../../services/userBook.service';
import {Book} from '../../../models/book';
import {UserBook} from '../../../models/userBook';
import {User} from '../../../models/user';


@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css']
})
export class BorrowListComponent implements OnInit {

  @Input() currentUser: User;
  @Output() fullUserEventEmitter: EventEmitter<FullUser> = new EventEmitter<FullUser>();
  @Output() userEmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  private borrows: UserBook[];
  private value: any;
  private users: FullUser[];
  private nrOfElements: any;
  private p: any;
  private subscriptionInit: Subscription;
  private paginatedBorrows: ResponsePageList<UserBook>;
  private selectedUser: User;
  private subscriptionPageGridChanged: Subscription;
  private subscriptionInputSearchChanged: Subscription;

  constructor(private userBookService: UserBookService) {
  }

  initListOfBorrows() {
    this.userBookService.getBorrowedBooks('id', 'ASC', '0', '5', String(this.currentUser.id)).subscribe(userBooks =>{
      this.paginatedBorrows = userBooks;
      this.borrows = this.paginatedBorrows.pageList;
      this.nrOfElements = this.paginatedBorrows.nrOfElements;
    } );
    console.log(this.borrows);
  }


  ngOnInit() {
    this.p = 0;
    this.initListOfBorrows();
  }

  inputSearchChanged() {
    // this.subscriptionInputSearchChanged = this.userService.getPaginatedUsers('id', 'ASC', '0', '5', this.value).subscribe(
    //   p => {
    //     this.paginatedUsers = p;
    //     this.users = this.paginatedUsers.pageList;
    //     this.nrOfElements = this.paginatedUsers.nrOfElements;
    //   }
    // );
  }

  pageGridChanged(event) {
    this.p = event;
    this.userBookService.getBorrowedBooks('id', 'ASC', (this.p - 1).toString(), '5', String(this.currentUser.id)).subscribe(userBooks => {
      this.paginatedBorrows = userBooks;
      this.borrows = this.paginatedBorrows.pageList;
      this.nrOfElements = this.paginatedBorrows.nrOfElements;
    });
  }

  showDetails(user: FullUser) {
    this.fullUserEventEmitter.emit(user);
    this.userEmitted.emit(true);
  }

  returnBorrowBook(book: Book) {
    this.userBookService.returnBorrowBook(this.currentUser, book).subscribe(t => console.log(t));
    this.pageGridChanged(this.p);
  }
}
