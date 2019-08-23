import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import {BookService} from '../../../services/book.service';

@Component({
  selector: 'book-grid-icon',
  templateUrl: './book-grid-icon.component.html',
  styleUrls: ['./book-grid-icon.component.css']
})
export class BookGridComponent implements OnInit {

  @Input() book: Book;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    console.log(this.book.averageStars);

 }


}
