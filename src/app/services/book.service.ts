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

   getBooksFromApi(query: string) {
       return  this.http.get('http://localhost:8080/searchBook',{
         params: {
           query : query
         }
       }) as Observable<Book[]>;
  }

  getPaginatedBooks(orderBy: string, direction: string, page: string, size: string, query: string) {
    return this.http.get('http://localhost:8080/paginatedBooks', {
      params: {
        orderBy: orderBy,
        direction: direction,
        page: page,
        size: size,
        query: query
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
