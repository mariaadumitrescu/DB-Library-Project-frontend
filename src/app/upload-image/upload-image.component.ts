import { Component, OnInit } from '@angular/core';
import {Book} from '../models/book';
import {HttpClient} from '@angular/common/http';
import {UploadImageService} from '../services/uploadImage.service';
import {BookService} from '../services/book.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private httpClient: HttpClient, private uploadImageService: UploadImageService, private bookService: BookService) { }

  selectedFile: any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  book: Book;
  flag: boolean;
  btnValue:  string = "Chose file";


  public  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => this.imgURL = reader.result;
    document.getElementById("btnUpload").className = "btn btn-success btn-file";
    this.flag =true;
    this.btnValue = "Replace file";

  }


  // This part is for uploading
  onUpload() {

    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

    this.uploadImageService.uploadImage(uploadData).subscribe(
      res => {
        this.receivedImageData = res;
        this.base64Data = res.pic;
        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.book = new Book();
        this.book.title = "Cartea neagra";
        this.book.author = "Brebu";
        this.book.genre = "Horror";
        this.book.isbn = "8965589665556";
        this.book.publishingHouse = "House of Light";
        this.book.year = 2015;
        this.book.img = res;
        this.bookService.addBook(this.book);
      },
      err => console.log('Error on saving: ' + err)
    )
  }

  ngOnInit(): void {
  }

}
