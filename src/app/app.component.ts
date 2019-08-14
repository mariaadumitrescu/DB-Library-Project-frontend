import {Component, OnInit} from '@angular/core';
import {Book} from './models/book';
import {BookService} from './services/book.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'my-first-angular-app';
  books: Book[];
  filteredBooks: Book[];
  value: string;

    constructor(private bookService: BookService) { }

    getBooks() {
      this.bookService.getBooksFromApi().subscribe( books => this.books = books);
    }

  ngOnInit(): void {
     this.getBooks();
  }

  onBtnClick() {
      this.bookService.getFilteredBooks(this.value).subscribe(filteredBooks => this.books = filteredBooks);
  }
}


