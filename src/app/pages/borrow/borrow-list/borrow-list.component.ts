import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullUser} from '../../../models/fullUser';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs';
import {ResponsePageList} from '../../../models/responsePageList';
import {UserBookService} from '../../../services/userBook.service';
import {Book} from '../../../models/book';
import {UserBook} from '../../../models/userBook';
import {User} from '../../../models/user';
import {Router} from '@angular/router';


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

  constructor(private userBookService: UserBookService,private router:Router) {
  }

  initListOfBorrows() {
    this.userBookService.getBorrowedBooks('id', 'ASC', '0', '5', String(this.currentUser.id)).subscribe(userBooks => {
      this.paginatedBorrows = userBooks;
      this.borrows = this.paginatedBorrows.pageList;
      this.nrOfElements = this.paginatedBorrows.nrOfElements;
    });
  }


  ngOnInit() {
    this.p = 0;
    this.initListOfBorrows();
  }

  pageGridChanged(event) {
    this.p = event;
    this.userBookService.getBorrowedBooks('id', 'ASC', (this.p - 1).toString(), '5', String(this.currentUser.id)).subscribe(userBooks => {
      this.paginatedBorrows = userBooks;
      this.borrows = this.paginatedBorrows.pageList;
      this.nrOfElements = this.paginatedBorrows.nrOfElements;
    });
  }


  async returnBorrowBook(book: Book) {
    await this.userBookService.returnBorrowBook(this.currentUser, book).toPromise();
    let nr = Math.floor(this.nrOfElements / 5);
    if (this.nrOfElements % 5 == 0) {
      this.pageGridChanged(nr);
    } else {
      if (nr < 1) {
        this.pageGridChanged(nr + 1);
      } else {
        this.pageGridChanged(nr);
      }

    }
  }

  goToPage(id: number) {
    this.router.navigate(['/book-page'], {queryParams: {bookId: id}});
  }
}
