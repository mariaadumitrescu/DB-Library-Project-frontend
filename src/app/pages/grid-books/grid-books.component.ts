import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {ResponsePageList} from '../../models/responsePageList';
import * as CanvasJS from '../../../assets/js/canvasjs.min';


@Component({
  selector: 'app-grid-books',
  templateUrl: './grid-books.component.html',
  styleUrls: ['./grid-books.component.css']
})
export class GridBooksComponent implements OnInit {

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.value = null;
    }
  }

  formData: FormData;

  paginatedBooks: ResponsePageList<Book>;
  searchedPaginatedBooks: ResponsePageList<Book>;
  books: Book[];
  searchedBooks: Book[];
  value: string;
  private p: any;
  private q: any;
  private flagSearch: boolean;

  constructor(private bookService: BookService,private eRef: ElementRef) {
  }

  initListOfBooks() {
    this.bookService.getPaginatedBooks('id', 'ASC', '0', '3', '').subscribe(p => {
      this.paginatedBooks = p;
      this.books = this.paginatedBooks.pageList;
    });

    this.bookService.getPaginatedBooks('id', 'ASC', '0', '3', '').subscribe(q => {
      this.searchedPaginatedBooks = q;
      this.searchedBooks = this.searchedPaginatedBooks.pageList;
    });
  }


  ngOnInit(): void {
    this.p =0;
    this.initListOfBooks();


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

  bookBorrowed(event: boolean) {
    this.bookService.getPaginatedBooks('id', 'ASC', this.p.toString(), '3', '').subscribe(p => {
      this.paginatedBooks = p;
      this.books = this.paginatedBooks.pageList;
    });
  }


}
