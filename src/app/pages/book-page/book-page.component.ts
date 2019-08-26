import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { BookGridComponent } from '../grid-books/book-grid-icon/book-grid-icon.component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  id: string;
  book: Book;
  constructor(private route: ActivatedRoute, private router:Router, private bookService: BookService) {
    //this.id = this.router.getCurrentNavigation().extras.state;
    this.route.queryParams.subscribe(params => {
      this.id = params['bookId'];
    });
  }

  ngOnInit(): void {
    //this.id = history.state;
    //this.book = this.bookService.getBooksFromApi(this.book);
  }
}
