import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import {BookService} from '../../../services/book.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'book-grid-icon',
  templateUrl: './book-grid-icon.component.html',
  styleUrls: ['./book-grid-icon.component.css']
})
export class BookGridComponent implements OnInit {

  @Input() book: Book;
  constructor(private router : Router) { 
  }
  ngOnInit(): void {   
     
 }
 gotoDynamic(id:string) {
  //this.router.navigateByUrl('/dynamic', { state: { id:1 , name:'Angular' } });
  this.router.navigate(['/book-page'], { queryParams: { bookId: id } });
}
}
