import {Component, OnInit} from '@angular/core';
import {Book} from './models/book';
import {BookService} from './services/book.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'my-first-angular-app';
  books: Book[];

    constructor(private bookService: BookService) { }

    getBooks() {
      this.bookService.getBooksFromApi().subscribe( books => this.books = books);
    }

  ngOnInit(): void {
     this.getBooks();
     console.log(this.books);
  }
}


