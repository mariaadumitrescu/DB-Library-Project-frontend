import {Image} from './image';

export class Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publishingHouse: string;
  year: number;
  genre: string;
  img: Image;


  constructor(isbn: string, title: string, author: string, publishingHouse: string, year: number, genre: string, img: Image) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.publishingHouse = publishingHouse;
    this.year = year;
    this.genre = genre;
    this.img = img;
  }
}
