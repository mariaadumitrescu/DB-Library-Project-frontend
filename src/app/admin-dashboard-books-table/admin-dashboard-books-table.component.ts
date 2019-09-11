import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {ResponsePageList} from '../models/responsePageList';
import {Book} from '../models/book';
import {ConfirmationDialogService} from '../services/dialog-confirm/dialog-confirm.service';
import {Subscription} from 'rxjs';
import {FullUser} from '../models/fullUser';

@Component({
  selector: 'app-admin-dashboard-books-table',
  templateUrl: './admin-dashboard-books-table.component.html',
  styleUrls: ['./admin-dashboard-books-table.component.css']
})
export class AdminDashboardBooksTableComponent implements OnInit {

  private subscriptionInit: Subscription;
  private subscriptionPageGridChanged: Subscription;
  private subscriptionGoToLast: Subscription;
  private subscriptionInputSearchChanged: Subscription;
  private paginatedBooks: ResponsePageList<Book>;
  private books: Book[];
  private value: string;
  private p: any;
  private nrOfElements: number;
  private addBookActivated: boolean;
  private added: any;
  private book: Book;
  private selectedBook: Book;
  private selectedUser: FullUser;
  private switch: boolean;
  private showUserTable = true;


  constructor(private bookService: BookService, private confirmationDialogService: ConfirmationDialogService) {
  }

  initListOfBooks() {
    this.subscriptionInit = this.bookService.getPaginatedBooks('id', 'ASC', '0', '5', '').subscribe(result => {
      this.paginatedBooks = result;
      this.books = this.paginatedBooks.pageList;
      this.selectedBook = this.books[0];
      this.nrOfElements = this.paginatedBooks.nrOfElements;
    });
  }

  pageGridChanged(event) {
    this.p = event;
    this.subscriptionPageGridChanged = this.bookService.getPaginatedBooks('id', 'ASC', (this.p - 1).toString(), '5', '').subscribe(p => {
      this.paginatedBooks = p;
      this.books = this.paginatedBooks.pageList;
      this.nrOfElements = this.paginatedBooks.nrOfElements;
    });
  }

  goToLast(page: number) {
    this.subscriptionGoToLast = this.bookService.getPaginatedBooks('id', 'ASC', (page - 1).toString(), '5', '').subscribe(p => {
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
    this.subscriptionInputSearchChanged = this.bookService.getPaginatedBooks('id', 'ASC', '0', '5', this.value).subscribe(
      p => {
        this.paginatedBooks = p;
        this.books = this.paginatedBooks.pageList;
        this.nrOfElements = this.paginatedBooks.nrOfElements;
      }
    );
  }

  async deleteBook(book: Book) {
    await this.bookService.removeBook(book.id).toPromise();
    let nr = String(this.nrOfElements / 5);
    if (this.nrOfElements % 5 == 0) {
      this.pageGridChanged(parseInt(nr));
    } else {
      this.pageGridChanged(parseInt(nr) + 1);
    }
  }

  async editBook(book: Book) {
    if(this.addBookActivated){
      this.book = await this.bookService.getBookById(String(book.id)).toPromise();
      this.selectedBook = await this.bookService.getBookById(String(book.id)).toPromise();
    }else {
      this.changePanelButton();
      this.book = await this.bookService.getBookById(String(book.id)).toPromise();
      this.selectedBook = await this.bookService.getBookById(String(book.id)).toPromise();
    }
  }

  hideAndShow() {
    this.changePanelButton();
  }

  async eventCaptured(event: boolean) {
    this.added = event;
    if (this.added) {
      if (this.nrOfElements % 5 == 0) {
        this.goToLast(this.p + 1);
      } else {
        this.goToLast(this.p);
      }
      this.addBookActivated = !this.addBookActivated
      this.showUserTable = !this.showUserTable;
    } else {
      this.paginatedBooks = await this.bookService.getPaginatedBooks('id', 'ASC', String(this.p), '5', '').toPromise();
      this.books = this.paginatedBooks.pageList;
      this.nrOfElements = this.paginatedBooks.nrOfElements;
      this.selectedBook = await this.bookService.getBookById(String(this.book.id)).toPromise();
      this.addBookActivated = !this.addBookActivated
      this.showUserTable = !this.showUserTable;
    }
  }

  addFlag() {
    if(this.addBookActivated){
      this.p = (this.nrOfElements / 5) + 1;
      this.book = null;
    }else {
      this.changePanelButton();
      this.p = (this.nrOfElements / 5) + 1;
      this.book = null;
    }
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

  async showDetails(book: Book) {
    this.selectedBook = await this.bookService.getBookById(book.id.toString()).toPromise();
    this.book = this.selectedBook;
    this.switch =false;
  }

  async ratingDeleted(event) {
    if (event) {
      this.selectedBook = await this.bookService.getBookById(this.selectedBook.id.toString()).toPromise();
      this.book = await this.bookService.getBookById(this.selectedBook.id.toString()).toPromise();
    }
  }

  userCaptured(event: FullUser) {
    this.selectedUser = event;
  }

  userEmitted(event: boolean) {
    this.switch = event;
  }

  changePanelButton(){
    let showPanel = document.getElementById('showPanel');
    this.addBookActivated = !this.addBookActivated;
    this.showUserTable = !this.showUserTable;
    if(!this.showUserTable){
      showPanel.innerHTML = 'Show author panel'
    }else {
      showPanel.innerHTML = 'Show book panel'
    }
  }
}
