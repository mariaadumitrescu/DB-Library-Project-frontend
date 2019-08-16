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
}
