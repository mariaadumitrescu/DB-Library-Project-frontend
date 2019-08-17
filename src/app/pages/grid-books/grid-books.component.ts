import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {PaginatedBooks} from '../../models/paginatedBooks';

@Component({
  selector: 'app-grid-books',
  templateUrl: './grid-books.component.html',
  styleUrls: ['./grid-books.component.css']
})
export class GridBooksComponent implements OnInit {

  paginatedBooks: PaginatedBooks;
  books: Book[];
  searchedBooks: Book[];
  value: string;
  private p: any;

  constructor(private bookService: BookService) {
  }

  getBooks() {
    this.bookService.getPaginatedBooks('id', 'ASC', '0', '9',this.value).subscribe(p => {

      this.paginatedBooks = p;
      this.books = this.paginatedBooks.content;
    });
  }


  ngOnInit(): void {
    this.value = '';
    this.getBooks();
  }

  pageChanged(event) {
    this.p = event;
    this.bookService.getPaginatedBooks('id', 'ASC', this.paginatedBooks.number.toString(), '9',this.value).subscribe(p => {
      this.paginatedBooks = p;
      this.books = this.paginatedBooks.content;
    });
  }

  searchBooks() {
    this.bookService.getBooksFromApi(this.value).subscribe(b => {
      this.searchedBooks = b;
    });
  }
}
