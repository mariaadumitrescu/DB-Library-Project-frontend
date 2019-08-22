import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  title = 'my-first-angular-app';
  value : string;
  books: Book[];
  filteredBooks: Book[];
  constructor(private bookService:BookService) { }

  onBtnClick() {
      this.bookService.getBooksFromApi(this.value).subscribe(filteredBooks => this.books = filteredBooks);
  }
  getBooks() {
    this.bookService.getAllBooks().subscribe( books => this.books = books);
  }

  ngOnInit(): void {
    this.getBooks();
  }

}
