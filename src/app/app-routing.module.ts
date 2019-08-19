import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {GridBooksComponent} from './pages/grid-books/grid-books.component';
import {UploadBookComponent} from './upload-book/upload-book.component';
import { BooksComponent } from './pages/dashboard-page/books/books.component';
import { BookService } from './services/book.service';


const routes: Routes = [
  { path: '', redirectTo: '/grid-books', pathMatch: 'full' },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'grid-books', component: GridBooksComponent },
  { path: 'books', component: BooksComponent },
  {path: 'upload-book', component:UploadBookComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BookService]
})
export class AppRoutingModule { }
