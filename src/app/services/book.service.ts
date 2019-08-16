import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../models/book';
import {Observable} from 'rxjs';
import {angularLifecycleMethodKeys} from 'codelyzer/util/utils';
import {PaginatedBooks} from '../models/paginatedBooks';


@Injectable()
export class BookService {
  books: Book[];
  // tslint:disable-next-line:prefer-const
  constructor(private http: HttpClient) { }

   getBooksFromApi() {
       return  this.http.get('http://localhost:8080/books') as Observable<Book[]>;
  }

  getBooks() {
    console.log(this.books);
    return this.books;
  }

  //http://localhost:8080/paginatedBooks?orderBy=id&direction=ASC&page=0&size=10

  getPaginatedBooks(orderBy: string, direction: string, page: string, size: string) {
    return this.http.get('http://localhost:8080/paginatedBooks', {
      params: {
        orderBy: orderBy,
        direction: direction,
        page: page,
        size: size
      }
    }) as Observable<PaginatedBooks>;
  }

  addBook(book: Book) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/add', book, {

      params: undefined,
      reportProgress: false,
      responseType: "json",
      withCredentials: false})
      .subscribe(res => {

      })
  }
}
