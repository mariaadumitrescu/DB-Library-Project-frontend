import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating';
import { AuthenticationService } from 'src/app/services/autentication.service';
import { UserService } from 'src/app/services/user.service';
import * as jwt_decode from "jwt-decode";
import { UserBookService } from 'src/app/services/userBook.service';
import { User } from 'src/app/models/user';
import { empty } from 'rxjs';
import { ResponsePageList } from 'src/app/models/responsePageList';
import { FullUser } from 'src/app/models/fullUser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  id: string;
  book: Book;
  authors: any;
  averageStars: number;
  title: any;
  rating: Rating;
  decoded: any;
  currentUser: FullUser;
  ratingValue: any;
  descriptionValue: any;
  paginatedRatings: ResponsePageList<Rating>;
  paginatedBooks: ResponsePageList<Book>;
  ratings: any;
  suggestedBooks: any;
  private p: any;
  private pg: any;
  private loading: boolean;
  @Output() bookBorrowed: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private route: ActivatedRoute, private router:Router,
     private bookService: BookService, private ratingService: RatingService,
     private authenticationService: AuthenticationService, private userBookService: UserBookService,
     private userService: UserService, private toastrService:ToastrService) {
    //this.id = this.router.getCurrentNavigation().extras.state;
    this.route.queryParams.subscribe(params => {
      this.id = params['bookId'];
    });
  }

  ngOnInit(): void {
    //this.id = history.state;
    this.bookService.getBookById(this.id).subscribe(p=> {
      this.book = p;
    });

    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    this.userService.getUserByEmail(this.decoded.sub).toPromise()
      .then(t =>{
        this.currentUser = t;
      });
    this.descriptionValue = '';
    this.initListOfBooks();
    this.initListOfRatings();
    
  }
  gotoDynamic(id: number) {
    this.router.navigate(['/book-page'], {queryParams: {bookId: id}});
  }

  printValue(){
    let today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.rating = new Rating(this.ratingValue, this.descriptionValue, this.currentUser, new Date());
    this.ratingService.addRatings(this.rating, this.id).subscribe(t=>{
      this.bookService.getBookById(this.id).subscribe(p=> {
        this.book = p;
      });
    });
  }
  initListOfRatings() {
    this.ratingService.getPaginatedRatings('id', 'ASC', '0', '3', this.id).subscribe(p => {
      this.paginatedRatings = p;
      this.ratings = this.paginatedRatings.pageList;
    });
  }
  pageRatingChanged(event) {
    this.p = event;
    this.ratingService.getPaginatedRatings('id', 'ASC', (this.p - 1).toString(), '3', this.id).subscribe(p => {

      this.paginatedRatings = p;
      this.ratings = this.paginatedRatings.pageList;
    });
  }
  initListOfBooks() {
    this.bookService.getSameGenreBooks('id', 'ASC', '0', '4', this.id).subscribe(p => {
      this.paginatedBooks = p;
      this.suggestedBooks = this.paginatedBooks.pageList;
    });
  }
  async borrow() {
    this.loading = true;
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    let currentUser = await this.userService.getUserByEmail(this.decoded.sub).toPromise();

    //get current date and add maximum-period days
    let today = new Date();
    const maximumBorrowedDays = 10;

    today.setDate(today.getDate() + maximumBorrowedDays);

    this.userBookService.addUserBook(currentUser, this.book, today.toISOString().slice(0, 10)).subscribe(
      value => {
        this.showSuccess();
        this.bookBorrowed.emit(true);
        this.loading = false;

      },error => {
        this.showError(error);
        this.loading = false;
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