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
  currentUser: User;

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
      this.authors = this.book.authors;
      this.averageStars = this.book.averageStars;
      this.title = this.book.title;
      // console.log(this.book);
    });

    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    this.userService.getUserByEmail(this.decoded.sub).toPromise()
      .then(t =>{
        this.currentUser = t;
        console.log(this.currentUser.firstName);
      });
  }

  printValue(rating: number){
    console.log(rating);
    
    this.rating.user = this.currentUser;
    var today = new Date();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.rating.date = today;
    this.rating.value = rating;
    this.rating.description = '';
    this.ratingService.addRatings(this.rating, this.id);
  }
  
}