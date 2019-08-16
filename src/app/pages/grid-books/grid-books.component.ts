import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-grid-books',
  templateUrl: './grid-books.component.html',
  styleUrls: ['./grid-books.component.css']
})
export class GridBooksComponent implements OnInit {
  books: Book[];
  value: string;
  private p: any;

  constructor(private bookService: BookService) {
  }

  getBooks() {
    this.bookService.getBooksFromApi().subscribe(books => this.books = books);
  }

  ngOnInit(): void {
    this.getBooks();
  }

  onBtnClick() {
    this.bookService.getFilteredBooks(this.value).subscribe(filteredBooks => this.books = filteredBooks);
  }

  pageChanged(event){
    this.p = event;
  }
}
