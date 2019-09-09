import {Component, OnInit, Input} from '@angular/core';
import {Book} from 'src/app/models/book';
import {BookService} from '../../../services/book.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/autentication.service';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../../../services/user.service';
import {UserBook} from '../../../models/userBook';
import {UserBookService} from '../../../services/userBook.service';
import {getMilliseconds} from 'ngx-bootstrap/chronos/utils/date-getters';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'book-grid-icon',
  templateUrl: './book-grid-icon.component.html',
  styleUrls: ['./book-grid-icon.component.css']
})
export class BookGridComponent implements OnInit {

  @Input() book: Book;
  averagePercent: number;
  decoded: any;

  constructor(private userBookService: UserBookService,
              private userService: UserService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toastrService:ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  gotoDynamic(id: number) {
    //this.router.navigateByUrl('/dynamic', { state: { id:1 , name:'Angular' } });
    this.router.navigate(['/book-page'], {queryParams: {bookId: id}});
  }


  async borrow() {
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    let currentUser = await this.userService.getUserByEmail(this.decoded.sub).toPromise();
    console.log(currentUser);

    //get current date and add maximum-period days
    let today = new Date();
    const maximumBorrowedDays = 10;

    today.setDate(today.getDate() + maximumBorrowedDays);

    this.userBookService.addUserBook(currentUser, this.book, today.toISOString().slice(0, 10)).subscribe(
      value => {
        this.showSuccess();
      },error => {
        this.showError(error);
      }
    );
  }


  showSuccess() {
    this.toastrService.success('The book with title: '+this.book.title+' was borrowed with success!', 'Enjoy!');
  }

  showError(error:string) {
    this.toastrService.error(error, 'Error!');
  }
}
