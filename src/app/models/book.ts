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
  averageStars: number;

  constructor(isbn: string, title: string, author: string, publishingHouse: string, year: number, genre: string, img: Image, averageStars: number) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.publishingHouse = publishingHouse;
    this.year = year;
    this.genre = genre;
    this.img = img;
    this.averageStars = averageStars;
  }
}
