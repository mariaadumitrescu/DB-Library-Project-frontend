import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {UploadImageService} from '../services/uploadImage.service';
import {BookService} from '../services/book.service';
import {Book} from '../models/book';
import {ImageResult, ResizeOptions} from 'ng2-imageupload';
import {Author} from '../models/author';
import {Genre} from '../models/genre';
import {AuthorService} from '../services/author.service';
import {GenreService} from '../services/genre.service';
import {Image} from '../models/image';

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
  private imageWasSelected: boolean;
  private imageResult: ImageResult;

  private resizeOptions: ResizeOptions = {resizeMaxHeight: 1024, resizeMaxWidth: 1024};
  private selectedFile: any;
  private imgURL: string;
  private btnValue: string = 'Select image ( * required )';

  @ViewChild('f', {static: false}) formValues;
  author: any;
  genre: any;

  constructor(
    private imageUploadService: UploadImageService,
    private bookUploadService: BookService) {
  }

  selected(imageResult: ImageResult) {
    fetch(imageResult.resized.dataURL).then(res => res.blob()).then(() => {
      let splitBlob = imageResult.resized.dataURL.split(',');
      this.imageResult = imageResult;
      this.selectedFile = splitBlob[1];
      this.imgURL = imageResult.resized.dataURL;
      this.btnValue = 'Choose another image';
      this.imageWasSelected = true;
    });
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
    if (this.imageWasSelected) {
      this.uploadedImage = new Image(this.imageResult.file.name, this.imageResult.file.type, this.selectedFile);
    }
    this.book = new Book(this.isbn, this.title, [], this.publishingHouse, this.year, [], this.uploadedImage, [], this.description, this.stock);
    for (let i = 0; i < authorsForUpload.length; i++) {
      this.book.authors.push(authorsForUpload[i]);
    }
    for (let i = 0; i < genresForUpload.length; i++) {
      this.book.genres.push(genresForUpload[i]);
    }
    await this.bookUploadService.addBook(this.book).toPromise();
    this.reset();
    this.formValues.resetForm();
    this.added.emit(true);
  }

  reset() {
    this.imageWasSelected = false;
    this.title = null;
    this.isbn = null;
    this.publishingHouse = null;
    this.year = null;
    this.imgURL = null;
    this.btnValue = 'Select image ( * required )';
    this.tempAuthors = new Set<string>();
    this.tempGenres = new Set<string>();
    this.book = null;
    this.editedBook = null;
    this.description = null;
    this.stock = null;
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
      this.btnValue = 'Choose another image';
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
    if (this.imageWasSelected) {
      this.uploadedImage = new Image(this.imageResult.file.name, this.imageResult.file.type, this.selectedFile);
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
    await this.bookUploadService.addBook(this.book).toPromise();
    this.reset();
    this.formValues.resetForm();
    this.added.emit(false);

   
  }
}
