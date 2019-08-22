import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {ResponsePageList} from '../models/responsePageList';
import {Book} from '../models/book';

@Component({
  selector: 'app-admin-dashboard-books-table',
  templateUrl: './admin-dashboard-books-table.component.html',
  styleUrls: ['./admin-dashboard-books-table.component.css']
})
export class AdminDashboardBooksTableComponent implements OnInit {

  private paginatedBooks: ResponsePageList;

  private books: Book[];
  private value: string;
  private p: any;
  private q: any;
  private flagSearch: boolean;


  constructor(private bookService: BookService) {
  }

  initListOfBooks() {
    this.bookService.getPaginatedBooks('id', 'ASC', '0', '5', '').subscribe(p => {
      this.paginatedBooks = p;
      this.books = this.paginatedBooks.pageList;
    });
  }

  pageGridChanged(event) {
    this.p = event;
    this.bookService.getPaginatedBooks('id', 'ASC', (this.p - 1).toString(), '5', '').subscribe(p => {
      this.paginatedBooks = p;
      this.books = this.paginatedBooks.pageList;
    });
  }

  ngOnInit(): void {
    this.initListOfBooks();
  }

  inputSearchChanged() {
    this.bookService.getPaginatedBooks('id', 'ASC', '0', '5', this.value).subscribe(p => {
      this.paginatedBooks = p;
      this.books = this.paginatedBooks.pageList;
    });
  }

  deleteBook(book: Book) {
    alert("TODO delete!")
  }

  editBook(book: Book) {
    alert("TODO edit!")
  }
}
