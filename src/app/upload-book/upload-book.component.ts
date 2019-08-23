import {Component, OnDestroy, ViewChild} from '@angular/core';
import {UploadImageService} from '../services/uploadImage.service';
import {BookService} from '../services/book.service';
import {Book} from '../models/book';
import {ImageResult, ResizeOptions} from 'ng2-imageupload';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnDestroy {

  private formData: FormData;
  private book: Book;
  private imageObservable: any;
  private bookObservable: any;
  private title: string;
  private isbn: string;
  private author: string;
  private publishingHouse: string;
  private year: number;
  private genre: string;

  private resizeOptions: ResizeOptions = {resizeMaxHeight: 1024, resizeMaxWidth: 1024};
  private selectedFile: any;
  private imgURL: string;
  private btnValue: string = 'Select image';

  @ViewChild('f', {static: false}) formValues;

  constructor(private imageUploadService: UploadImageService, private bookUploadService: BookService) {
  }

  selected(imageResult: ImageResult) {
    fetch(imageResult.resized.dataURL).then(res => res.blob()).then(blob => {
      this.selectedFile = blob;
      this.imgURL = imageResult.resized.dataURL;
      this.btnValue = 'Image selected';
      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
      this.formData = uploadData;
    });

  }

  uploadBook() {

    if (this.formData) {
      this.imageObservable = this.imageUploadService.uploadImage(this.formData).subscribe(
        res => {
          this.book = new Book(this.isbn, this.title, this.author, this.publishingHouse, this.year, this.genre, res, 0);
          this.bookObservable = this.bookUploadService.addBook(this.book).subscribe(value => {
              this.formValues.resetForm();
              this.imgURL = null;
              this.btnValue = 'Select image';
              this.formData = null;
            }
          );
        },
        err => console.log('Error on saving: ' + err)
      );
    }
  }

  ngOnDestroy(): void {
    this.imageObservable.unsubscribe();
    this.bookObservable.unsubscribe();
  }
}
