import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {ResponsePageList} from '../../models/responsePageList';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import {FullUser} from '../../models/fullUser';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/autentication.service';
import * as jwt_decode from 'jwt-decode';
import {Genre} from '../../models/genre';
import {GenreService} from '../../services/genre.service';


@Component({
  selector: 'app-grid-books',
  templateUrl: './grid-books.component.html',
  styleUrls: ['./grid-books.component.css']
})
export class GridBooksComponent implements OnInit {

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.value = null;
    }
  }

  formData: FormData;

  private paginatedPaginatedBooks: ResponsePageList<Book>;
  private searchedPaginatedBooks: ResponsePageList<Book>;
  private preferredPaginatedBooks: ResponsePageList<Book>;
  private books: Book[] = [];
  private searchedBooks: Book[] = [];
  private preferredBooks: Book[] = [];
  private value: string;
  private p: any;
  private q: any;
  private r: any;
  private flagSearch: boolean;
  private currentUser: FullUser;
  private genres: Genre[];
  private uniqueGenres = new Set<string>();
  private genreValue = '';
  allGenres: string = 'All genres';


  constructor(private bookService: BookService,
              private eRef: ElementRef,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private genreService: GenreService) {
  }

  initListOfBooks() {

    this.bookService.getPaginatedBooks('id', 'DESC', '0', '3', this.genreValue).toPromise().then(p => {
      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;

    });

    this.bookService.getPaginatedBooks('id', 'DESC', '0', '3', '').toPromise().then(q => {
      this.searchedPaginatedBooks = q;
      this.searchedBooks = this.searchedPaginatedBooks.pageList;
    });

    this.bookService.getPreferredPaginatedBooks('averageStars', 'DESC', '0', '3', this.currentUser.id.toString()).toPromise().then(r => {
      this.preferredPaginatedBooks = r;
      this.preferredBooks = this.preferredPaginatedBooks.pageList;
    });

  }


  async ngOnInit() {
    this.p = 0;
    this.q = 0;
    this.r = 0;
    const token = this.authenticationService.getToken();
    let decode = jwt_decode(token);
    let email = decode['sub'];
    await this.userService.getUserByEmail(email).toPromise().then(user => {
      this.currentUser = user;
      this.initListOfBooks();
    });

    await this.genreService.getAllUnique().toPromise().then(genres => this.genres = genres);
    this.genres.forEach(genre => this.uniqueGenres.add(genre.name));




  }

  pageGridChanged(event) {
    this.p = event;
    this.bookService.getPaginatedBooks('id', 'DESC', (this.p - 1).toString(), '3', this.genreValue).subscribe(p => {

      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;
    });
  }

  preferredGridChanged(event) {
    this.r = event;
    this.bookService.getPreferredPaginatedBooks('averageStars', 'DESC', (this.r - 1).toString(), '3', this.currentUser.id.toString()).subscribe(r => {

      this.preferredPaginatedBooks = r;
      this.preferredBooks = this.preferredPaginatedBooks.pageList;
    });
  }

  inputSearchChanged() {
    this.flagSearch = false;
    this.bookService.getPaginatedBooks('id', 'DESC', '0', '3', this.value).subscribe(q => {
      this.searchedPaginatedBooks = q;
      this.searchedBooks = this.searchedPaginatedBooks.pageList;
      this.flagSearch = true;
    });

  }

  receiveMessage(event) {
    this.formData = event;
  }

  bookBorrowed(event: boolean) {
    this.bookService.getPaginatedBooks('id', 'DESC', this.p.toString(), '3', '').subscribe(p => {
      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;
    });
  }


  genreSelected(genre: string) {
    if(genre==this.allGenres){
      this.bookService.getPaginatedBooks('id', 'DESC', '0', '3', '').toPromise().then(p => {
        this.paginatedPaginatedBooks = p;
        this.books = this.paginatedPaginatedBooks.pageList;
      });
      this.genreValue = '';
      return;
    }
    this.genreValue = genre;
    this.bookService.getPaginatedBooks('id', 'DESC', '0', '3', this.genreValue).toPromise().then(p => {
      this.paginatedPaginatedBooks = p;
      this.books = this.paginatedPaginatedBooks.pageList;
    });

  }
}
