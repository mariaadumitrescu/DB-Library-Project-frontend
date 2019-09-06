import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullUser} from '../../../models/fullUser';
import {ResponsePageList} from '../../../models/responsePageList';
import {UserBookService} from '../../../services/userBook.service';
import {UserBook} from '../../../models/userBook';
import {User} from '../../../models/user';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


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
  private nrOfElements: any;
  private p: any;
  private paginatedBorrows: ResponsePageList<UserBook>;

  constructor(private userBookService: UserBookService, private router: Router, private toastrService: ToastrService) {
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


  async returnBorrowBook(userBook: UserBook) {
    this.userBookService.returnBorrowBook(userBook).subscribe(() => {
      this.toastrService.success('The book with title: ' + userBook.book.title + ' was returned', 'Returned with success!');
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
    });
  }

  goToPage(id: number) {
    this.router.navigate(['/book-page'], {queryParams: {bookId: id}});
  }
}
