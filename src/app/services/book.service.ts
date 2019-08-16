import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../models/book';
import {Observable} from 'rxjs';
import {angularLifecycleMethodKeys} from 'codelyzer/util/utils';


@Injectable()
export class BookService {
  books: Book[];
  // tslint:disable-next-line:prefer-const
  constructor(private http: HttpClient) { }

   getBooksFromApi() {
       return  this.http.get('http://localhost:8080/books') as Observable<Book[]>;
  // img: null; year: number; author: string; isbn: string; genre: string; publishingHouse: string; title: string }[] {
  //    const book = {
  //     isbn: '978-606-789-109-6',
  //     title: 'Arta subtila a nepasarii',
  //     author: 'Mark Manson',
  //     publishingHouse: 'Lifestyle Publishing',
  //     year: 2017,
  //     genre: 'Dezvoltare personala',
  //     img: null
  //   };
  }

  getBooks() {
    console.log(this.books);
    return this.books;
  }

  getFilteredBooks(value: string) {
    return this.http.get('http://localhost:8080/searchBook', {
      params: {
        query: value,
      }
    }) as Observable<Book[]>;
  }

  addBook(book: Book) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/add', book, {
      observe: "body",
      params: undefined,
      reportProgress: false,
      responseType: "json",
      withCredentials: false})
      .subscribe(res => {

      })
  }
}
