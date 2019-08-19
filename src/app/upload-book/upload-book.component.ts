import {Component, OnInit} from '@angular/core';
import {UploadImageService} from '../services/uploadImage.service';
import {BookService} from '../services/book.service';
import {Book} from '../models/book';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent {

  private emittedForm: FormData;
  private book: Book;

  constructor(private imageUploadService: UploadImageService, private bookUploadService: BookService) {
  }

  receiveMessage(event) {
    this.emittedForm = event;
  }

  uploadBook() {

    if (this.emittedForm) {
      this.imageUploadService.uploadImage(this.emittedForm).subscribe(
        res => {
          this.book = new Book();
          this.book.title = 'Cartea neagra';
          this.book.author = 'Sile';
          this.book.genre = 'Actiune';
          this.book.isbn = '8965589665556';
          this.book.publishingHouse = 'House of Light';
          this.book.year = 2015;
          this.book.img = res;
          this.bookUploadService.addBook(this.book);
        },
        err => console.log('Error on saving: ' + err)
      );
    }
  }
}
