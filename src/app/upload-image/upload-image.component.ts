import {Component} from '@angular/core';
import {Book} from '../models/book';
import {HttpClient} from '@angular/common/http';
import {UploadImageService} from '../services/uploadImage.service';
import {BookService} from '../services/book.service';
import {ImageResult, ResizeOptions} from 'ng2-imageupload';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {

  resizeOptions: ResizeOptions = {resizeMaxHeight: 1024, resizeMaxWidth: 1024};
  selectedFile: any;
  imgURL: any;
  book: Book;
  flag: boolean;
  btnValue: string = 'Chose file';

  constructor(private httpClient: HttpClient, private uploadImageService: UploadImageService, private bookService: BookService) {
  }

  selected(imageResult: ImageResult) {
    fetch(imageResult.resized.dataURL).then(res => res.blob()).then(blob => this.selectedFile = blob);
    this.imgURL = imageResult.resized.dataURL;
    document.getElementById('btnUpload').className = 'btn btn-success btn-file';
    this.flag = true;
    this.btnValue = 'Replace file';
  }

  onUpload() {

    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

    this.uploadImageService.uploadImage(uploadData).subscribe(
      res => {
        this.book = new Book();
        this.book.title = 'Cartea neagra';
        this.book.author = 'Sile';
        this.book.genre = 'Actiune';
        this.book.isbn = '8965589665556';
        this.book.publishingHouse = 'House of Light';
        this.book.year = 2015;
        this.book.img = res;
        this.bookService.addBook(this.book);
        this.flag = false;
      },
      err => console.log('Error on saving: ' + err)
    );
  }
}
