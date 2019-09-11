import { Component, OnInit, Input } from '@angular/core';
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
  ratings: any;
  private p: any;

  constructor(private route: ActivatedRoute, private router:Router,
     private bookService: BookService, private ratingService: RatingService,
     private authenticationService: AuthenticationService, private userBookService: UserBookService,
     private userService: UserService) {
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
  }

  printValue(){
    console.log(this.ratingValue);
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
  initListOfBooks() {
    this.ratingService.getPaginatedRatings('id', 'ASC', '0', '3', this.id).subscribe(p => {
      this.paginatedRatings = p;
      this.ratings = this.paginatedRatings.pageList;
    });
  }
  pageGridChanged(event) {
    this.p = event;
    this.ratingService.getPaginatedRatings('id', 'ASC', (this.p - 1).toString(), '3', this.id).subscribe(p => {

      this.paginatedRatings = p;
      this.ratings = this.paginatedRatings.pageList;
    });
  }
  
}