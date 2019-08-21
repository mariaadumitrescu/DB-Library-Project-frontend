import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {GridBooksComponent} from './pages/grid-books/grid-books.component';
import {UploadBookComponent} from './upload-book/upload-book.component';
import { BooksComponent } from './pages/dashboard-page/books/books.component';
import { BookService } from './_services/book.service';
import {AdminDashboardBooksTableComponent} from './admin-dashboard-books-table/admin-dashboard-books-table.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/grid-books', pathMatch: 'full' },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'grid-books', component: GridBooksComponent },
  { path: 'books', component: BooksComponent },
  { path: 'admin-table', component: AdminDashboardBooksTableComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path: 'upload-book', component:UploadBookComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BookService]
})
export class AppRoutingModule { }
