import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {ResponsePageList} from '../../models/responsePageList';

@Component({
  selector: 'app-grid-books',
  templateUrl: './grid-books.component.html',
  styleUrls: ['./grid-books.component.css']
})
export class GridBooksComponent implements OnInit {

  formData: FormData;

  paginatedBooks: ResponsePageList<Book>;
  searchedPaginatedBooks: ResponsePageList<Book>;
  books: Book[];
  searchedBooks: Book[];
  value: string;
  private p: any;
  private q: any;
  private flagSearch: boolean;

  constructor(private bookService: BookService) {
  }

  initListOfBooks() {
    this.bookService.getPaginatedBooks('id', 'ASC', '0', '4', '').subscribe(p => {
      this.paginatedBooks = p;
      this.books = this.paginatedBooks.pageList;
    });

    this.bookService.getPaginatedBooks('id', 'ASC', '0', '3', '').subscribe(q => {
      this.searchedPaginatedBooks = q;
      this.searchedBooks = this.searchedPaginatedBooks.pageList;
    });
  }


  ngOnInit(): void {
    this.initListOfBooks();
  }

  pageGridChanged(event) {
    this.p = event;
    this.bookService.getPaginatedBooks('id', 'ASC', (this.p - 1).toString(), '4', '').subscribe(p => {

      this.paginatedBooks = p;
      this.books = this.paginatedBooks.pageList;
    });
  }

  inputSearchChanged() {
    this.flagSearch = false;
    this.bookService.getPaginatedBooks('id', 'ASC', '0', '3', this.value).subscribe(q => {
      this.searchedPaginatedBooks = q;
      this.searchedBooks = this.searchedPaginatedBooks.pageList;
      this.flagSearch = true;
    });

  }

  pageSearchChanged(event) {
    this.q = event;
    this.bookService.getPaginatedBooks('id', 'ASC', (this.q - 1).toString(), '5', this.value).subscribe(q => {
      this.searchedPaginatedBooks = q;
      this.searchedBooks = this.searchedPaginatedBooks.pageList;
    });
  }

  receiveMessage(event) {
    this.formData = event;
  }
}
