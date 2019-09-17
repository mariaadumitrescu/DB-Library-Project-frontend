import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {Author} from '../../models/author';
import {Genre} from '../../models/genre';
import {Image} from '../../models/image';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/autentication.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnChanges {

  @Output() added: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editedBook: Book;
  private book: Book;
  private title: string;
  private isbn: string;
  private publishingHouse: string;
  private year: number;
  private description: string;
  private stock: number;
  private averageStars: number;
  private uploadedImage: Image;
  private tempAuthors = new Set<string>();
  private tempGenres = new Set<string>();
  private selectedFile: any;
  private imgURL: string;
  private byteBlob: string;


  @ViewChild('f', {static: false}) formValues;
  author: any;
  genre: any;

  constructor(
    private bookUploadService: BookService, private userService: UserService, private authenticationService: AuthenticationService, private toastr: ToastrService) {
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedFile = event
  }

  imageCropped(event: ImageCroppedEvent) {
    this.selectedFile = event;
    this.croppedImage = event.base64;
    this.imgURL = event.base64;
  }

  imageLoaded() {
  }

  cropperReady() {
  }

  loadImageFailed() {
    // show message
  }

  async uploadBook() {
    let authorsForUpload = [];
    let genresForUpload = [];
    for (let author of this.tempAuthors) {
      authorsForUpload.push(new Author(author));
    }
    for (let genre of this.tempGenres) {
      genresForUpload.push(new Genre(genre));
    }
    if (this.croppedImage) {
      await fetch(this.selectedFile.base64).then(res => res.blob()).then(() => {
        let splitBlob = this.selectedFile.base64.split(',');
        this.byteBlob = splitBlob[1];
      });
      this.uploadedImage = new Image(this.selectedFile.file.name, this.selectedFile.file.type, this.byteBlob);
    }
    this.book = new Book(this.isbn, this.title, [], this.publishingHouse, this.year, [], this.uploadedImage, [], this.description, this.stock, 0);
    for (let i = 0; i < authorsForUpload.length; i++) {
      this.book.authors.push(authorsForUpload[i]);
    }
    for (let i = 0; i < genresForUpload.length; i++) {
      this.book.genres.push(genresForUpload[i]);
    }

    this.bookUploadService.addBook(this.book)
    .toPromise().then(
      data => {
        this.showUploadSuccess();
        this.added.emit(true);
      },
      error => {
        this.showUploadError(error);
    });

    this.reset();
    this.formValues.resetForm();

  }

  reset() {
    this.title = null;
    this.isbn = null;
    this.publishingHouse = null;
    this.year = null;
    this.imgURL = null;
    this.tempAuthors = new Set<string>();
    this.tempGenres = new Set<string>();
    this.book = null;
    this.editedBook = null;
    this.description = null;
    this.stock = null;
    this.selectedFile = null;
  }

  addAuthor(event: any) {
    this.tempAuthors.add(event);
    let authorInput = document.getElementById('author') as HTMLInputElement;
    authorInput.value = '';
  }

  addGenre(event: any) {
    this.tempGenres.add(event);
    let genreInput = document.getElementById('genre') as HTMLInputElement;
    genreInput.value = '';
  }

  deleteAuthor(author: string) {
    this.tempAuthors.delete(author);
  }

  deleteGenre(genre: string) {
    this.tempGenres.delete(genre);
  }

  ngOnChanges(): void {
    if (this.editedBook) {
      this.tempAuthors = new Set<string>();
      this.tempGenres = new Set<string>();
      this.title = this.editedBook.title;
      this.isbn = this.editedBook.isbn;
      this.selectedFile = this.editedBook.img.pic;
      this.imgURL = 'data:image/jpeg;base64,' + this.editedBook.img.pic;
      this.publishingHouse = this.editedBook.publishingHouse;
      this.year = this.editedBook.year;
      this.description = this.editedBook.description;
      this.stock = this.editedBook.stock;
      this.averageStars = this.editedBook.averageStars;
      this.uploadedImage = this.editedBook.img;
      for (let author of this.editedBook.authors) {
        this.tempAuthors.add(author.name);
      }
      for (let genre of this.editedBook.genres) {
        this.tempGenres.add(genre.name);
      }
    } else {
      this.tempAuthors = new Set<string>();
      this.tempGenres = new Set<string>();
      this.reset();
    }
  }


  async editBook() {
    let authorsForUpload = [];
    let genresForUpload = [];
    for (let author of this.tempAuthors) {
      authorsForUpload.push(new Author(author));
    }
    for (let genre of this.tempGenres) {
      genresForUpload.push(new Genre(genre));
    }
    if (this.croppedImage) {
      await fetch(this.selectedFile.base64).then(res => res.blob()).then(() => {
        let splitBlob = this.selectedFile.base64.split(',');
        this.byteBlob = splitBlob[1];
      });
      this.uploadedImage = new Image(this.selectedFile.file.name, this.selectedFile.file.type, this.byteBlob);
    }
    this.book = this.editedBook;
    this.book.isbn = this.isbn;
    this.book.title = this.title;
    this.book.authors = [];
    this.book.publishingHouse = this.publishingHouse;
    this.book.year = this.year;
    this.book.description = this.description;
    this.book.stock = this.stock;
    this.book.averageStars = this.averageStars;
    this.book.genres = [];
    this.book.img = this.uploadedImage;
    this.book.ratings = this.editedBook.ratings;
    for (let i = 0; i < authorsForUpload.length; i++) {
      this.book.authors.push(authorsForUpload[i]);
    }
    for (let i = 0; i < genresForUpload.length; i++) {
      this.book.genres.push(genresForUpload[i]);
    }

    this.bookUploadService.addBook(this.book)
    .subscribe(
      data => {
        this.showEditSuccess();
        this.added.emit(false);
      },
      error => {
        this.showEditError(error);
    });

    this.reset();
    this.formValues.resetForm();
  }

  showEditSuccess() {
    this.toastr.success('Your edit was successful', 'Great!');
  }

  showEditError(error:string) {
    this.toastr.error(error, 'Error!');
  }

  showUploadSuccess() {
    this.toastr.success('You successfully added a new book', 'Great!');
  }

  showUploadError(error:string) {
    this.toastr.error(error, 'Error!');
  }

}
