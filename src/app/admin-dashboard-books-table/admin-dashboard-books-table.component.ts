import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {ResponsePageList} from '../models/responsePageList';
import {Book} from '../models/book';
import {ConfirmationDialogService} from '../services/dialog-confirm/dialog-confirm.service';

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

  private nrOfElements: number;
  private addBookActivated: boolean;
  private added: any;
  private book: Book;
  private q: any;
  private flagSearch: boolean;


  constructor(private bookService: BookService, private confirmationDialogService: ConfirmationDialogService) {
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

  goToLast(page: number) {
    this.bookService.getPaginatedBooks('id', 'ASC', page.toString(), '5', '').subscribe(p => {
      this.paginatedBooks = p;
      this.books = this.paginatedBooks.pageList;
      this.nrOfElements = this.paginatedBooks.nrOfElements;
      this.p = page;
    });
  }

  ngOnInit(): void {
    this.p = 0;
    this.initListOfBooks();
  }

  inputSearchChanged() {
    this.bookService.getPaginatedBooks('id', 'ASC', '0', '5', this.value).subscribe(
      p => {
        this.paginatedBooks = p;
        this.books = this.paginatedBooks.pageList;
        this.nrOfElements = this.paginatedBooks.nrOfElements;
      }
    );

  }

  async deleteBook(book: Book) {
    await this.bookService.removeBook(book.id).toPromise();
    this.paginatedBooks = await this.bookService.getPaginatedBooks('id', 'ASC', '0', '5', this.value).toPromise();
    let nr: string = (this.nrOfElements / 5).toString();
    if (this.nrOfElements % 5 == 0) {
      this.pageGridChanged(parseInt(nr));
    } else {
      this.pageGridChanged(parseInt(nr) + 1);
    }
  }

  editBook(book: Book) {
    this.book = book;
    this.addBookActivated = true;
  }

  hideAndShow() {
    this.addBookActivated = !this.addBookActivated;
  }

  eventCaptured(event: boolean) {
    this.added = event;
    if (this.added) {
      if (this.nrOfElements % 5 == 0) {
        this.goToLast(this.p + 1);
      } else {
        this.goToLast(this.p);
      }
    }
    this.addBookActivated = false!
  }

  addFlag() {
    this.p = (this.nrOfElements / 5) + 1;
    this.goToLast(parseInt(this.p));
    this.book = null;
    this.addBookActivated = true;
  }

  deleteBookDialog(book: Book) {
    this.addBookActivated = false;
    this.confirmationDialogService.confirm('Please confirm delete', 'Do you really want to delete ?')
      .then((confirmed) => {
          if (confirmed) {
            this.deleteBook(book);
          }
        }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}