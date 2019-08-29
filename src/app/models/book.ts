import {Image} from './image';
import {Author} from './author';
import {Genre} from './genre';
import {Rating} from './rating';


export class Book {
  id: number;
  isbn: string;
  title: string;
  authors: Author[];
  publishingHouse: string;
  year: number;
  genres: Genre[];
  img: Image;
  ratings: Rating[];
  description: string;
  averageStars: number;
  stock: number;



  constructor(isbn: string, title: string, authors: Author[], publishingHouse: string, year: number, genre: Genre[], img: Image, ratings: Rating[], description: string, stock: number) {

    this.isbn = isbn;
    this.title = title;
    this.authors = authors;
    this.publishingHouse = publishingHouse;
    this.year = year;
    this.genres = genre;
    this.img = img;
    this.ratings = ratings;
    this.description = description;
    this.stock = stock;
  }


}
