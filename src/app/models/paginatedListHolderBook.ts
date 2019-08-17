import {Book} from './book';
import {Sort} from './sort';

export class PaginatedListHolderBook {
  source: Book[];
  refreshDate: Date;
  sort: Sort;
  pageSize: number;
  page: number;
  maxLinkedPages: number;
  lastElementOnPage: number;
  firstElementOnPage: number;
  LastLinkedPage: number;
  firstLinkedPage: number;
  nrOfElements: number;
  lastPage: boolean;
  pageList: Book[];
  firstPage: boolean;
  pageCount: number;
}
