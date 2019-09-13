import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {ResponsePageList} from '../../models/responsePageList';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import {FullUser} from '../../models/fullUser';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/autentication.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-grid-books',
  templateUrl: './grid-books.component.html',
  styleUrls: ['./grid-books.component.css']
})
export class GridBooksComponent implements OnInit {

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.value = null;
    }
  }

  formData: FormData;

  private paginatedPaginatedBooks: ResponsePageList<Book>;
  private searchedPaginatedBooks: ResponsePageList<Book>;
  private preferredPaginatedBooks: ResponsePageList<Book>;
  private books: Book[] = [];
  private searchedBooks: Book[] = [];
  private preferredBooks: Book[] = [];
  private value: string;
  private p: any;
  private q: any;
  private r: any;
  private flagSearch: boolean;
  private currentUser: FullUser;


  constructor(private bookService: BookService,
              private eRef: ElementRef,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  initListOfBooks() {

    this.bookService.getPaginatedBooks('id', 'ASC', '0', '3', '').toPromise().then(p => {
      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;

    });

    this.bookService.getPaginatedBooks('id', 'ASC', '0', '3', '').toPromise().then(q => {
      this.searchedPaginatedBooks = q;
      this.searchedBooks = this.searchedPaginatedBooks.pageList;
    });

    this.bookService.getPreferredPaginatedBooks('id', 'ASC', '0', '3', this.currentUser.id.toString()).toPromise().then(r => {
      this.preferredPaginatedBooks = r;
      this.preferredBooks = this.preferredPaginatedBooks.pageList;
    });

  }


  async ngOnInit() {
    this.p = 0;
    this.q = 0;
    this.r = 0;
    const token = this.authenticationService.getToken();
    let decode = jwt_decode(token);
    let email = decode['sub'];
    await this.userService.getUserByEmail(email).toPromise().then(user=> {
      this.currentUser = user;
      this.initListOfBooks();
    });

    // let chart = new CanvasJS.Chart("chartContainer", {
    //   animationEnabled: true,
    //   exportEnabled: true,
    //   title: {
    //     text: "Basic Column Chart in Angular"
    //   },
    //   data: [{
    //     type: "column",
    //     dataPoints: [
    //       { y: 71, label: "Beletristica" },
    //       { y: 55, label: "Literatura" },
    //       { y: 50, label: "Arhitectura" },
    //       { y: 65, label: "Tehnologie" },
    //       { y: 95, label: "Stiinta" },
    //       { y: 68, label: "Educatie" },
    //       { y: 28, label: "Horror" },
    //       { y: 34, label: "Dezvoltare personala" },
    //       { y: 14, label: "Interbelic" }
    //     ]
    //   }]
    // });
    //
    // chart.render();
    //
    //
    //   let chartPie = new CanvasJS.Chart("chartContainerPie", {
    //     theme: "light2",
    //     animationEnabled: true,
    //     exportEnabled: true,
    //     title:{
    //       text: "Monthly Expense"
    //     },
    //     data: [{
    //       type: "pie",
    //       showInLegend: true,
    //       toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
    //       indexLabel: "{name} - #percent%",
    //       dataPoints: [
    //         { y: 450, name: "Food" },
    //         { y: 120, name: "Insurance" },
    //         { y: 300, name: "Traveling" },
    //         { y: 800, name: "Housing" },
    //         { y: 150, name: "Education" },
    //         { y: 150, name: "Shopping"},
    //         { y: 250, name: "Others" }
    //       ]
    //     }]
    //   });
    //
    // chartPie.render();


  }

  pageGridChanged(event) {
    this.p = event;
    this.bookService.getPaginatedBooks('id', 'ASC', (this.p - 1).toString(), '3', '').subscribe(p => {

      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;
    });
  }

  preferredGridChanged(event) {
    this.r = event;
    this.bookService.getPreferredPaginatedBooks('id', 'ASC', (this.r - 1).toString(), '3', this.currentUser.id.toString()).subscribe(r => {

      this.preferredPaginatedBooks = r;
      this.preferredBooks = this.preferredPaginatedBooks.pageList;
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

  receiveMessage(event) {
    this.formData = event;
  }

  bookBorrowed(event: boolean) {
    this.bookService.getPaginatedBooks('id', 'ASC', this.p.toString(), '3', '').subscribe(p => {
      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;
    });
  }


}
