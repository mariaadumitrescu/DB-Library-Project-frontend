import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  title = 'my-first-angular-app';
  books: Book[];
  filteredBooks: Book[];
  value: string;

  constructor(private bookService: BookService) { }

  getBooks() {
    this.bookService.getAllBooks().subscribe( books => this.books = books);
  }

  ngOnInit(): void {
    this.getBooks();
 }

}
