import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GridBooksComponent} from './pages/grid-books/grid-books.component';
import { BookService } from './services/book.service';
import {LoginComponent} from './login/login.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import { BookPageComponent } from './pages/book-page/book-page.component';

import {AdminDashboardBooksTableComponent} from './admin-dashboard-books-table/admin-dashboard-books-table.component';
import {AuthGuard} from './helpers/auth.gurad';
import {ForbiddenComponent} from './pages/forbidden/forbidden.component';

const routes: Routes = [
  { path: '', component: GridBooksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'book-page', component: BookPageComponent},
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'admin-table', component: AdminDashboardBooksTableComponent, canActivate: [AuthGuard]},


  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BookService]
})
export class AppRoutingModule { }
