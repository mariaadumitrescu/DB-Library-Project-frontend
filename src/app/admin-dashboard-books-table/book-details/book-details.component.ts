import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {ConfirmationDialogService} from '../../services/dialog-confirm/dialog-confirm.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  @Input() selectedBook: Book;
  @Output() ratingDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private bookService :BookService, private confirmationDialogService : ConfirmationDialogService) { }

  async deleteRating(i:number) {
    this.selectedBook.ratings.splice(i,1);
    await this.bookService.addBook(this.selectedBook).toPromise();
    this.ratingDeleted.emit(true);
  }

  deleteBookDialog(i:number) {
    this.confirmationDialogService.confirm('Please confirm delete', 'Do you really want to delete ?')
      .then((confirmed) => {
          if (confirmed) {
            this.deleteRating(i);
          }
        }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
