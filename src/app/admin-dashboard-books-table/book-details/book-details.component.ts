import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  @Input() selectedBook: Book;
  @Output() ratingDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private bookService :BookService) { }

  async deleteRating(i:number) {
    this.selectedBook.ratings.splice(i,1);
    await this.bookService.addBook(this.selectedBook).toPromise();
    this.ratingDeleted.emit(true);
  }
}
