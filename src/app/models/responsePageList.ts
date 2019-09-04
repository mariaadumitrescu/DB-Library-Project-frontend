import {Book} from './book';

export class ResponsePageList<T> {
  nrOfElements: number;
  pageList: T[];
}
